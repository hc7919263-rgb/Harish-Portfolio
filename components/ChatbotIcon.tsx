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
            {/* Thought Bubble (Cloud Style) */}
            <div className="absolute bottom-full right-0 mb-10 pointer-events-none animate-bubble-loop">
                <div className="relative flex flex-col items-center">
                    {/* Cloud Body */}
                    <div className="relative bg-white/90 backdrop-blur-lg border border-white/20 px-5 py-2.5 rounded-[40px] shadow-2xl shadow-black/10 whitespace-nowrap">
                        <span className="text-sm font-black text-gray-800 tracking-tight relative z-10">Ask me about Harish!</span>

                        {/* Cloud Bumps */}
                        <div className="absolute -top-3 -left-1 w-7 h-7 bg-white/90 backdrop-blur-lg rounded-full border-t border-l border-white/10"></div>
                        <div className="absolute -top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-lg rounded-full border-t border-white/10"></div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/90 backdrop-blur-lg rounded-full border-b border-r border-white/10"></div>
                        <div className="absolute -bottom-2 left-6 w-5 h-5 bg-white/90 backdrop-blur-lg rounded-full border-b border-white/10"></div>
                    </div>

                    {/* Thought Dots */}
                    <div className="flex flex-col items-end w-full pr-10 mt-1 gap-1.5 translate-x-1">
                        <div className="w-3.5 h-3.5 bg-white/90 backdrop-blur-lg rounded-full border border-white/20 shadow-md"></div>
                        <div className="w-2 h-2 bg-white/90 backdrop-blur-lg rounded-full border border-white/20 shadow-md mr-1"></div>
                    </div>
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
                @keyframes bubble-loop {
                    0%, 100% { opacity: 0; transform: translateY(15px) scale(0.8); }
                    5%, 75% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-bubble-loop {
                    animation: bubble-loop 8s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default ChatbotIcon;
