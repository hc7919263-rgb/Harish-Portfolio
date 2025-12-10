import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';

interface NotFoundPageProps {
    onNavigate: (page: 'home') => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
    return (
        <section className="min-h-screen flex items-center justify-center bg-white px-6">
            <div className="text-center">
                <h1 className="text-9xl font-black text-black mb-4">404</h1>
                <p className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</p>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you are looking for seems to have wandered off.
                    Let's get you back on track.
                </p>
                <button
                    onClick={() => onNavigate('home')}
                    className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                    {/* @ts-ignore */}
                    <AiOutlineHome className="w-5 h-5" />
                    <span>Back to Home</span>
                </button>
            </div>
        </section>
    );
};

export default NotFoundPage;
