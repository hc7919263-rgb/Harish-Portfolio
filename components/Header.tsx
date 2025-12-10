import React, { useState } from 'react';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  onNavigate: (page: 'home' | 'creations' | 'contact' | 'foundation' | 'chatbot', anchor?: string) => void;
  currentPage: 'home' | 'creations' | 'contact' | 'foundation' | 'chatbot';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = currentPage === 'home';

  const navLinkClasses = `cursor-pointer relative transition-colors ${isHomePage
    ? "text-white hover:text-gray-300 after:bg-white"
    : "text-black hover:text-gray-600 after:bg-black"
    } after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'home' | 'creations' | 'contact' | 'foundation' | 'chatbot', anchor?: string) => {
    e.preventDefault();
    onNavigate(page, anchor);
  };

  const handleMobileLinkClick = (page: 'home' | 'creations' | 'contact' | 'foundation' | 'chatbot', anchor?: string) => {
    onNavigate(page, anchor);
    setIsMenuOpen(false);
  };

  const desktopNavLinks = (
    <>
      <a href="/" onClick={(e) => handleNavClick(e, 'home')} className={`${navLinkClasses} text-sm lg:text-base`}>Home</a>
      <a href="/creations" onClick={(e) => handleNavClick(e, 'creations')} className={`${navLinkClasses} text-sm lg:text-base`}>Creations</a>
      <a href="/foundation" onClick={(e) => handleNavClick(e, 'foundation')} className={`${navLinkClasses} text-sm lg:text-base`}>Foundation</a>
      <a href="/contact" onClick={(e) => handleNavClick(e, 'contact')} className={`cursor-pointer font-bold py-2 px-4 lg:py-3 lg:px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 text-sm lg:text-base ${isHomePage ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
        }`}>
        CONTACT
      </a>
    </>
  );

  const mobileNavLinks = (
    <>
      <button onClick={() => handleMobileLinkClick('home')} className="block w-full text-center py-3 hover:bg-gray-100 rounded-md transition-all duration-200 transform hover:scale-105">Home</button>
      <button onClick={() => handleMobileLinkClick('creations')} className="block w-full text-center py-3 hover:bg-gray-100 rounded-md transition-all duration-200 transform hover:scale-105">Creations</button>
      <button onClick={() => handleMobileLinkClick('foundation')} className="block w-full text-center py-3 hover:bg-gray-100 rounded-md transition-all duration-200 transform hover:scale-105">Foundation</button>
      <button onClick={() => handleMobileLinkClick('contact')} className="mt-2 bg-black text-white font-bold py-3 px-6 rounded-full hover:bg-gray-800 transition-all duration-200 w-full text-center transform hover:scale-105">
        CONTACT
      </button>
    </>
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-20 pt-6">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <nav className="flex justify-between items-center relative">
          <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="cursor-pointer flex items-center gap-2 lg:gap-3">
            <div className="scale-75 lg:scale-100 origin-left">
              <LogoIcon />
            </div>
            <span className="font-bold text-xl lg:text-2xl text-black">Harish</span>
          </a>
          <div className="hidden md:flex items-center gap-4 lg:gap-10">
            {desktopNavLinks}
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu" className="z-50 relative text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute top-full mt-4 left-0 right-0 bg-white rounded-lg shadow-xl z-30">
              <div className="flex flex-col items-center gap-2 p-4 text-black">
                {mobileNavLinks}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;