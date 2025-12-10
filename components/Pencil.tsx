import React, { useState, useEffect } from 'react';

interface PencilProps {
    className?: string;
    style?: React.CSSProperties;
    variant?: 'light' | 'dark';
}

const Pencil: React.FC<PencilProps> = ({ className = '', style = {}, variant = 'light' }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate position relative to center of screen for tilt
            const x = (e.clientX - window.innerWidth / 2) / 25;
            const y = (e.clientY - window.innerHeight / 2) / 25;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const imageStyle: React.CSSProperties = variant === 'light'
        ? { mixBlendMode: 'multiply' }
        : { filter: 'invert(1) grayscale(1) brightness(2)', mixBlendMode: 'screen' };

    return (
        <div
            className={`hidden md:block absolute z-50 transition-transform duration-75 ease-out ${className}`}
            style={{
                transform: `rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
                perspective: '1000px',
                ...style
            }}
        >
            <img
                src="/assets/pencil_character.png"
                alt="Animated Pencil"
                className="w-32 h-auto animate-wave"
                style={imageStyle}
                loading="lazy"
            />
        </div>
    );
};

export default Pencil;
