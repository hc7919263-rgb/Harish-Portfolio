import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, Shield, AlertTriangle, Phone, Mail } from 'lucide-react';

interface LoginPageProps {
    onLoginSuccess: () => void;
    onNavigate: (page: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
    // State
    const [step, setStep] = useState<1 | 2 | 3>(1); // 1=PIN, 2=OTP, 3=Math
    const [inputVal, setInputVal] = useState('');
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // OTP State
    // const [otp, setOtp] = useState(''); // Removed: Server-Side now
    const [isSending, setIsSending] = useState(false);

    // Math State
    const [mathQ, setMathQ] = useState({ q: '', a: 0 });

    // Lockout Timer
    useEffect(() => {
        let timer: any;
        if (isLocked && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (isLocked && countdown === 0) {
            setIsLocked(false);
            setAttempts(0);
            setError('');
        }
        return () => clearTimeout(timer);
    }, [isLocked, countdown]);

    // Generate Math Question
    useEffect(() => {
        if (step === 3) {
            const n1 = Math.floor(Math.random() * 20) + 10; // 10-30
            const n2 = Math.floor(Math.random() * 10) + 1;  // 1-10
            const ops = ['+', '-', '*'];
            const op = ops[Math.floor(Math.random() * 3)];

            let ans = 0;
            if (op === '+') ans = n1 + n2;
            if (op === '-') ans = n1 - n2;
            if (op === '*') ans = n1 * n2;

            setMathQ({ q: `${n1} ${op} ${n2}`, a: ans });
            setInputVal('');
        }
    }, [step]);

    // Handlers
    const handleSendOtp = async () => {
        setIsSending(true);
        // OTP is now generated Server-Side. We just request it.
        // setOtp(newOtp); // REMOVED: Insecure client-side generation

        try {
            const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}) // Send to default admin
            });
            const data = await res.json();

            if (data.success) {
                console.log("OTP Request Sent");
            } else {
                console.warn("Server message:", data.message);
                // Handle failures
            }
        } catch (err: any) {
            console.error("Failed to send", err);
            setError(`Failed to email code. ${err.message || ''}`);
        } finally {
            setIsSending(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLocked(true); // Temp lock UI while validating
        try {
            const res = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: inputVal })
            });
            const data = await res.json();

            if (data.success) {
                setStep(3);
                setError('');
                setIsLocked(false);
            } else {
                setIsLocked(false);
                handleFail();
            }
        } catch (e) {
            setIsLocked(false);
            setError('Verification Error');
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;

        // Step 1: PIN
        if (step === 1) {
            try {
                // Verify PIN with server (Secure)
                const res = await fetch('/api/verify-pin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pin: inputVal })
                });
                const data = await res.json();

                if (data.success) {
                    setStep(2);
                    setInputVal('');
                    setError('');
                    handleSendOtp();
                } else {
                    handleFail();
                }
            } catch (err) {
                console.error("PIN check failed", err);
                setError("Connection Error");
            }
        }
        // Step 2: OTP
        else if (step === 2) {
            // Verify with Server
            await handleVerifyOtp();
        }
        // Step 3: Math
        else if (step === 3) {
            if (parseInt(inputVal) === mathQ.a) {
                onLoginSuccess();
            } else {
                handleFail();
            }
        }
    };

    const handleFail = () => {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
            setIsLocked(true);
            setCountdown(30);
            setError('System Locked');
        } else {
            setError('Invalid Entry');
        }
        setInputVal('');
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-white">

            <button
                onClick={() => onNavigate('home')}
                className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-20"
            >
                <ArrowLeft className="w-5 h-5" /> Cancel
            </button>

            <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-sm relative z-10 border border-gray-700">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black mb-2">
                        {step === 1 ? 'Enter PIN' : step === 2 ? 'Verify Identity' : 'Math Test'}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {step === 1 ? 'Enter access PIN.' :
                            step === 2 ? (isSending ? 'Sending email...' : 'Enter OTP code.') :
                                'Solve to prove humanity.'}
                    </p>
                </div>

                {isLocked ? (
                    <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-6 rounded-2xl text-center mb-4">
                        <AlertTriangle className="w-10 h-10 mx-auto mb-3" />
                        <p className="font-bold text-lg mb-1">Locked</p>
                        <div className="text-3xl font-black">{countdown}s</div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="flex justify-center mb-6">
                            {step === 1 && <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center"><Lock className="w-8 h-8 text-white" /></div>}
                            {step === 2 && <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center relative">
                                {isSending ? (
                                    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Mail className="w-8 h-8 text-blue-400" />
                                )}
                            </div>}
                            {step === 3 && <div className="w-16 h-16 bg-green-900/50 rounded-2xl flex items-center justify-center text-2xl font-bold font-mono">?</div>}
                        </div>

                        {step === 3 && (
                            <div className="text-center text-2xl font-bold mb-4 font-mono text-green-400">
                                {mathQ.q} = ?
                            </div>
                        )}

                        <input
                            type={step === 3 ? "number" : "text"}
                            autoFocus
                            value={inputVal}
                            maxLength={step === 3 ? 10 : 6}
                            disabled={isSending}
                            onChange={(e) => setInputVal(e.target.value.replace(step === 3 ? /[^\d-]/g : /\D/g, ''))}
                            className={`w-full text-center text-3xl font-bold py-4 border-b-2 border-gray-600 focus:border-white focus:outline-none transition-colors bg-transparent placeholder-gray-700 disabled:opacity-50
                                ${step === 3 ? 'tracking-normal' : 'tracking-[0.5em]'}
                            `}
                            placeholder={step === 3 ? "?" : "••••••"}
                        />

                        {error && (
                            <div className="text-red-400 text-sm font-bold text-center animate-pulse">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!inputVal || isSending}
                            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2
                                ${inputVal
                                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
                            `}
                        >
                            {step === 3 ? 'Unlock Panel' : 'Next'} <Shield className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
