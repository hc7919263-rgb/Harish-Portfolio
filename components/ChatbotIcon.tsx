import React from 'react';

interface ChatbotIconProps {
    onNavigate: (page: 'chatbot') => void;
}

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onNavigate }) => {
    return (
        <div
            onClick={() => onNavigate('chatbot')}
            className="fixed bottom-6 right-6 z-50 group cursor-pointer"
        >
            {/* Thought Bubble */}
            <div className="absolute bottom-full right-4 mb-4 opacity-0 transition-all duration-500 transform translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 animate-fade-loop">
                <div className="relative bg-white/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-xl shadow-black/5 whitespace-nowrap">
                    <span className="text-sm font-bold text-gray-800 tracking-tight">Ask me about Harish!</span>
                    {/* Bubble Tail */}
                    <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white/90 backdrop-blur-md border-r border-b border-white/20 rotate-45"></div>
                </div>
            </div>

            <div className="relative transition-transform duration-300 transform group-hover:scale-110 active:scale-95">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse group-hover:bg-blue-500/30 transition-colors"></div>
                <img
                    src="/assets/chatbot_icon.png"
                    alt="Chatbot"
                    className="w-16 h-16 rounded-full shadow-lg border-2 border-white/50 relative z-10"
                />
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-20"></div>
            </div>

            <style>{`
                @keyframes fade-loop {
                    0%, 2%, 20%, 100% { opacity: 0; transform: translateY(10px); }
                    5%, 15% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-loop {
                    animation: fade-loop 25s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default ChatbotIcon;
