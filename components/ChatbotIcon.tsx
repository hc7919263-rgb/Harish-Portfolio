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
            <div className="relative transition-transform duration-300 transform group-hover:scale-110">
                <img
                    src="/assets/chatbot_icon.png"
                    alt="Chatbot"
                    className="w-16 h-16 rounded-full shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
        </div>
    );
};

export default ChatbotIcon;
