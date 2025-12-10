import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
    onNavigate: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Harish Chavan. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-8 text-sm text-gray-500 font-medium">
                    <button
                        onClick={() => onNavigate('terms')}
                        className="hover:text-black transition-colors"
                    >
                        Terms & Conditions
                    </button>
                    <button
                        onClick={() => onNavigate('privacy')}
                        className="hover:text-black transition-colors"
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => onNavigate('admin')}
                        className="text-gray-300 hover:text-black transition-colors p-1"
                        title="Admin Access"
                    >
                        <Lock className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
