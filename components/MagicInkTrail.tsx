import React, { useState, useEffect } from 'react';

const MagicInkTrail: React.FC = () => {
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setTrail(prev => [
                ...prev.slice(-20), // Keep last 20 points
                { x: e.clientX, y: e.clientY, id: Date.now() }
            ]);
        };

        const fadeInterval = setInterval(() => {
            setTrail(prev => {
                if (prev.length > 0) {
                    return prev.slice(1);
                }
                return prev;
            });
        }, 20);

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(fadeInterval);
        };
    }, []);

    return (
        <svg className="pointer-events-none fixed top-0 left-0 w-full h-full z-[9999]" style={{ pointerEvents: 'none', mixBlendMode: 'difference' }}>
            <defs>
                <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
                </linearGradient>
            </defs>
            {trail.length > 1 && (
                <path
                    d={`M ${trail.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                    fill="none"
                    stroke="url(#inkGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
};

export default MagicInkTrail;
