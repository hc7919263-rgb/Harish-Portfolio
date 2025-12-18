import React, { useState, useEffect } from 'react';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import Pencil from './Pencil';

interface HeroProps {
  onNavigate: (page: 'home' | 'creations' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {


  const [imageError, setImageError] = useState(false);
  const firstName = "Harish";
  const lastName = "Chavan";
  const lastNameAnimationDelay = 1.5; // Start animating the last name after 1.5s

  return (
    <div className="text-center relative perspective-1000">


      <Pencil className="right-[-25%] top-10" />
      <div className="text-center">
        {!imageError ? (
          <img
            src="/assets/profile.jpg"
            alt="Harish Chavan (Hrchavan)"
            className="w-56 h-56 rounded-full border-4 border-gray-200 object-cover mb-6 shadow-lg mx-auto"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-56 h-56 rounded-full border-4 border-gray-200 bg-gray-100 flex items-center justify-center mb-6 shadow-lg mx-auto">
            <span className="text-4xl font-bold text-gray-400">HC</span>
          </div>
        )}

        <p className="text-xl md:text-2xl text-gray-600">Hi, I am</p>
        {/* Hidden H1 for SEO Crawlers */}
        <h1 className="sr-only">Harish Chavan (Hrchavan)</h1>

        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black mt-2 leading-tight flex flex-wrap justify-center gap-x-3 md:gap-x-4" aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {firstName.split('').map((char, index) => (
              <span
                key={`first-${index}`}
                className="animate-dance inline-block"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="inline-block whitespace-nowrap">
            {lastName.split('').map((char, index) => (
              <span
                key={`last-${index}`}
                className="animate-dance inline-block"
                style={{ animationDelay: `${lastNameAnimationDelay + index * 0.5}s` }}
              >
                {char}
              </span>
            ))}
          </span>
        </div>
        <p className="text-xl md:text-2xl text-gray-600 mt-4">
          Business Analytics Student
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center">
          <button onClick={() => onNavigate('contact')} className="bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center">
            Contact Me
          </button>
          <button
            onClick={() => onNavigate('creations')}
            className="bg-gray-200 text-black font-bold py-3 px-6 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto text-center"
          >
            View My Work
          </button>
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <a href="https://github.com/Harry-0402" target="_blank" rel="noopener noreferrer" className="bg-gray-200 p-3 rounded-md hover:bg-gray-300 transition-colors">
            <GithubIcon className="text-black" />
          </a>
          <a href="https://www.linkedin.com/in/harish-chavan-a4248738b" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1" aria-label="LinkedIn">
            <LinkedinIcon className="text-black" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;