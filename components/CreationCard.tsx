import React from 'react';

interface CreationCardProps {
  title: string;
  description: string;
  skills: string[];
  url: string;
  status?: 'coming-soon';
}

export const CreationCard: React.FC<CreationCardProps> = ({ title, description, skills, url, status }) => {
  return (
    <div className="bg-gray-50 rounded-2xl shadow-xl p-4 md:p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2">
      <div className="flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-black mb-3">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 mb-6">{description}</p>
        <div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-200 text-gray-800 text-xs md:text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        {status === 'coming-soon' ? (
          <button
            disabled
            className="inline-block w-full text-center bg-gray-400 text-white font-bold py-3 px-4 md:px-6 rounded-full cursor-not-allowed text-sm md:text-base"
          >
            Coming Soon
          </button>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-black text-white font-bold py-3 px-4 md:px-6 rounded-full hover:bg-gray-800 transition-all duration-300 text-sm md:text-base"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
};