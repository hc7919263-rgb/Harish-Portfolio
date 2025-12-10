import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
/* @ts-ignore */
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

// --- CONFIGURATION ---
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Debugging: Check if keys are loaded
console.log("EmailJS Config:", {
    ServiceId: EMAILJS_SERVICE_ID ? "Loaded" : "Missing",
    TemplateId: EMAILJS_TEMPLATE_ID ? "Loaded" : "Missing",
    PublicKey: EMAILJS_PUBLIC_KEY ? "Loaded" : "Missing"
});

const ContactFormEmailJS: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);

    // -- STATE --
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        purpose: 'Collaboration',
        project_summary: '',
        intent_level: 'Exploring',
        timeline: 'Not Sure',
        budget_range: 'Not Decided',
        final_message: '',
        lead_score: 0,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        website: '', // Honeypot
        consent: false
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // -- EFFECTS --

    // Update Page URL on mount
    useEffect(() => {
        setFormData(prev => ({ ...prev, page_url: window.location.href }));
    }, []);

    // Calculate Lead Score
    useEffect(() => {
        let score = 0;
        if (formData.project_summary.length > 30) score += 3;
        if (formData.intent_level === 'Ready to start') score += 3;
        if (formData.timeline !== 'Not Sure') score += 2;
        if (formData.budget_range !== 'Not Decided') score += 2;
        if (formData.purpose === 'Collaboration' || formData.purpose === 'Project Inquiry') score += 3;

        setFormData(prev => {
            if (prev.lead_score !== score) {
                return { ...prev, lead_score: score };
            }
            return prev;
        });
    }, [
        formData.project_summary,
        formData.intent_level,
        formData.timeline,
        formData.budget_range,
        formData.purpose
    ]);

    // Confetti Animation Effect
    useEffect(() => {
        let animationFrameId: number;

        if (status === 'success') {
            const duration = 3 * 1000;
            const end = Date.now() + duration;

            // Go for a "School Pride" effect - side cannons
            const colors = ['#000000', '#ffffff', '#FFD700']; // Black, White, Gold

            const frame = () => {
                // Launch a few confetti from the left edge
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                // and a few from the right edge
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                // Keep animating for a short time only
                if (Date.now() < end) {
                    animationFrameId = requestAnimationFrame(frame);
                }
            };

            frame();
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [status]);


    // -- HANDLERS --

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Safety Checks
        if (formData.website) return; // Honeypot

        setStatus('sending');
        setErrorMessage('');

        try {
            if (!formRef.current) throw new Error("Form reference missing");

            // Ensure hidden fields are up to date in DOM for emailjs
            // (React state binding does this, but being explicit helps safety)

            await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);

            setStatus('success');

            // Reset
            setFormData(prev => ({
                ...prev,
                project_summary: '',
                final_message: '',
                website: '',
                consent: false
            }));
            if (formRef.current) formRef.current.reset();

        } catch (error: any) {
            console.error("Submission Error Details:", error);
            setErrorMessage(`Failed to send message. ${error.text || error.message || 'Unknown error'}`);
            setStatus('error');
        }
    };


    // -- VALIDATION --
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email);
    const isFormValid =
        formData.user_name.trim().length > 0 &&
        isEmailValid &&
        formData.project_summary.trim().length > 0 &&
        formData.consent;

    return (
        <div className="w-full max-w-xl mx-auto p-1">
            {status === 'success' ? (
                <div
                    className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in"
                    role="status"
                    aria-live="polite"
                >
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
                    <p className="text-gray-600 mb-4">Thanks for the details. I typically reply within 24-48 hours.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-sm font-medium text-black hover:underline"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                    aria-label="Contact form"
                >
                    {/* Hidden Fields */}
                    <input type="hidden" name="lead_score" value={formData.lead_score} />
                    <input type="hidden" name="page_url" value={formData.page_url} />

                    {/* Honeypot */}
                    <div className="opacity-0 absolute top-0 left-0 h-0 w-0 overflow-hidden">
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="user_name" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                                Your Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="user_name"
                                type="text"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black placeholder-gray-500 transition-all duration-300"
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="user_email" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                                Your Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="user_email"
                                type="email"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                                required
                                className={`w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black placeholder-gray-500 transition-all duration-300 ${!isEmailValid && formData.user_email.length > 0 ? 'ring-2 ring-red-100' : ''}`}
                                placeholder="jane@example.com"
                            />
                            {!isEmailValid && formData.user_email.length > 0 && (
                                <p className="text-xs text-red-500 mt-1 pl-1" role="alert">Please enter a valid email address.</p>
                            )}
                        </div>
                    </div>

                    {/* Purpose */}
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Purpose</label>
                        <div className="relative">
                            <select
                                id="purpose"
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleChange}
                                className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black appearance-none pr-10"
                            >
                                <option value="Collaboration">Collaboration</option>
                                <option value="Project Inquiry">Project Inquiry</option>
                                <option value="Freelance Work">Freelance Work</option>
                                <option value="Academic Help">Academic Help</option>
                                <option value="Networking">Networking</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                {/* @ts-ignore */}
                                <FiChevronDown className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Project Summary */}
                    <div>
                        <label htmlFor="project_summary" className="block text-sm font-bold text-gray-700 mb-2 pl-1">
                            One-line Project Summary <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="project_summary"
                            type="text"
                            name="project_summary"
                            value={formData.project_summary}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black placeholder-gray-500 transition-all duration-300"
                            placeholder="e.g. A React dashboard for a fintech startup"
                        />
                    </div>

                    {/* Intent & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="intent_level" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Intent Level</label>
                            <div className="relative">
                                <select
                                    id="intent_level"
                                    name="intent_level"
                                    value={formData.intent_level}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black appearance-none pr-10"
                                >
                                    <option value="Exploring">Exploring</option>
                                    <option value="Interested">Interested</option>
                                    <option value="Ready to start">Ready to start</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                    {/* @ts-ignore */}
                                    <FiChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="timeline" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Timeline</label>
                            <div className="relative">
                                <select
                                    id="timeline"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleChange}
                                    className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black appearance-none pr-10"
                                >
                                    <option value="Not Sure">Not Sure</option>
                                    <option value="Immediate">Immediate</option>
                                    <option value="1-2 Weeks">1-2 Weeks</option>
                                    <option value="1 Month">1 Month</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                    {/* @ts-ignore */}
                                    <FiChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget */}
                    <div>
                        <label htmlFor="budget_range" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Budget Range</label>
                        <div className="relative">
                            <select
                                id="budget_range"
                                name="budget_range"
                                value={formData.budget_range}
                                onChange={handleChange}
                                className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black appearance-none pr-10"
                            >
                                <option value="Not Decided">Not Decided</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                {/* @ts-ignore */}
                                <FiChevronDown className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="final_message" className="block text-sm font-bold text-gray-700 mb-2 pl-1">Final Message</label>
                        <textarea
                            id="final_message"
                            name="final_message"
                            value={formData.final_message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-gray-100 border-transparent focus:border-black focus:ring-0 rounded-lg p-3 text-black placeholder-gray-500 transition-all duration-300"
                            placeholder="Anything else?"
                        ></textarea>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="consent"
                                name="consent"
                                type="checkbox"
                                checked={formData.consent}
                                onChange={handleChange}
                                required
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="consent" className="text-gray-600">
                                I agree to process my data for this request. <span className="text-red-500">*</span>
                            </label>
                        </div>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!isFormValid || status === 'sending'}
                        className={`w-full bg-black text-white font-bold py-3 px-8 rounded-full 
                    transition-all duration-300 transform 
                    ${isFormValid && status !== 'sending' ? 'hover:-translate-y-1 hover:bg-gray-800' : 'opacity-50 cursor-not-allowed'}
                `}
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>

                </form>
            )}
        </div>
    );
};

export default ContactFormEmailJS;
