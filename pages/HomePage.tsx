import React, { useState } from 'react';
import Hero from '../components/Hero';
import Creations from '../components/Creations';
import Collaborations from '../components/Collaborations';
import Skills from '../components/Skills';
import ResumeSection from '../components/ResumeSection';

import { useData } from '../context/DataContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HomePageProps {
  onNavigate: (page: 'home' | 'creations' | 'contact', anchor?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // @ts-ignore
  const { meta } = useData();
  useScrollReveal();

  const defaultAbout = `I am currently pursuing business analytics at Sandip University. I work with data to solve business problems, manage information, analyze trends, and turn numbers into clear insights for better decisions.

I also work in No-code UX Development, where I design clean and smooth user experiences and build functional tools that support business workflows, dashboards, and automation.

I am looking for opportunities to apply my skills in real projects and grow through hands on work. I am open to connecting with professionals in the field.`;

  const aboutText = meta?.aboutText || defaultAbout;

  const scrollToResume = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('resume-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'contact') => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <>
      <section className="w-full bg-white flex flex-col md:flex-row min-h-screen">
        {/* Left Column: Hero Content */}
        <div className="w-full md:w-[45%] flex items-center justify-center px-6 lg:px-12 pt-28 pb-16 md:pt-16 md:pb-0 reveal-visible">
          <div className="max-w-md w-full">
            <Hero onNavigate={onNavigate} />
          </div>
        </div>

        {/* Right Column: Animated Text Box */}
        <div
          className="hidden md:flex w-full md:w-[55%] bg-black items-center relative group"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >

          <div className="w-[69%] ml-auto h-[75vh] text-gray-300 relative overflow-hidden pr-12 lg:pr-24">
            <div className="animate-scroll-up">
              {/* First Instance */}
              <div>
                <p className="text-xl leading-loose tracking-wide whitespace-pre-line">
                  {aboutText}
                </p>
                <div className="h-[480px] flex items-center justify-center">
                  <a href="#resume-section" onClick={scrollToResume} aria-label="Download Resume" className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
              {/* Second Instance for seamless loop */}
              <div>
                <p className="text-xl leading-loose tracking-wide whitespace-pre-line">
                  {aboutText}
                </p>
                <div className="h-[480px] flex items-center justify-center">
                  <a href="#resume-section" onClick={scrollToResume} aria-label="Download Resume" className="bg-white text-black font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
                    <span>Download Resume</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-only "About Me" section */}
      <section className="md:hidden bg-white px-6 py-16 reveal-visible">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-black text-center text-black mb-8">
            About Me
          </h2>
          <p className="text-gray-600 text-center whitespace-pre-line mb-8">
            {aboutText}
          </p>
          <div className="text-center">
            <a href="#resume-section" onClick={scrollToResume} className="bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2">
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </section>

      <div className="reveal-hidden"><Creations onViewMore={() => onNavigate('creations')} /></div>
      <div className="reveal-hidden"><Collaborations onNavigate={onNavigate} /></div>
      <div className="reveal-hidden"><Skills /></div>
      <div className="reveal-hidden"><ResumeSection /></div>
    </>
  );
};

export default HomePage;