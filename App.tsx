import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreationsPage from './pages/CreationsPage';
import ContactPage from './pages/ContactPage';
import FoundationPage from './pages/FoundationPage';
import ChatbotPage from './pages/ChatbotPage';
import NotFoundPage from './components/NotFoundPage';
import MagicInkTrail from './components/MagicInkTrail';
import ChatbotIcon from './components/ChatbotIcon';
import Footer from './components/Footer';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

type Page = 'home' | 'creations' | 'contact' | 'foundation' | 'chatbot' | '404' | 'terms' | 'privacy' | 'admin';

import { DataProvider } from './context/DataContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [targetAnchor, setTargetAnchor] = useState<string | null>(null);

  // Real-Time Visitor Tracking
  useEffect(() => {
    let sessionId = sessionStorage.getItem('visitor_sess_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('visitor_sess_id', sessionId);
    }

    const beat = () => {
      fetch('http://localhost:3001/api/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      }).catch(() => { }); // Shh on error
    };

    beat();
    const interval = setInterval(beat, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initial Routing Check
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    switch (path) {
      case '/':
        setCurrentPage('home');
        break;
      case '/creations':
        setCurrentPage('creations');
        break;
      case '/contact':
        setCurrentPage('contact');
        break;
      case '/foundation':
        setCurrentPage('foundation');
        break;
      case '/chatbot':
        setCurrentPage('chatbot');
        break;
      case '/terms':
        setCurrentPage('terms');
        break;
      case '/privacy':
        setCurrentPage('privacy');
        break;
      case '/admin':
        setCurrentPage('admin');
        break;
      default:
        setCurrentPage('404');
    }

    // Handle back/forward browser buttons
    const handlePopState = () => {
      const newPath = window.location.pathname.toLowerCase();
      // Reuse switch logic or refactor, simple check for now:
      if (newPath === '/') setCurrentPage('home');
      else if (newPath === '/creations') setCurrentPage('creations');
      else if (newPath === '/contact') setCurrentPage('contact');
      else if (newPath === '/foundation') setCurrentPage('foundation');
      else if (newPath === '/chatbot') setCurrentPage('chatbot');
      else if (newPath === '/terms') setCurrentPage('terms');
      else if (newPath === '/privacy') setCurrentPage('privacy');
      else if (newPath === '/admin') setCurrentPage('admin');
      else setCurrentPage('404');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Effect to scroll to anchor after page navigation
  useEffect(() => {
    if (targetAnchor) {
      const timer = setTimeout(() => {
        const element = document.getElementById(targetAnchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setTargetAnchor(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentPage, targetAnchor]);


  const handleNavigate = (page: Page, anchor?: string) => {
    if (page === currentPage && anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentPage(page);

      // Update URL
      const path = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', path);

      if (anchor) {
        setTargetAnchor(anchor);
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  // Render Content
  const renderContent = () => {
    if (currentPage === '404') {
      return (
        <main className="font-['Roboto'] bg-white relative flex flex-col min-h-screen">
          <MagicInkTrail />
          <div className="flex-grow">
            <NotFoundPage onNavigate={(p) => handleNavigate(p)} />
          </div>
          <Footer onNavigate={(p) => handleNavigate(p)} />
        </main>
      );
    }

    if (currentPage === 'admin') {
      return isAuthenticated
        ? <AdminPage onNavigate={handleNavigate} />
        : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} onNavigate={handleNavigate} />;
    }

    return (
      <main className="font-['Roboto'] bg-white relative flex flex-col min-h-screen">
        <MagicInkTrail />
        {currentPage !== 'chatbot' && <ChatbotIcon onNavigate={(page) => handleNavigate(page as any)} />}
        <Header onNavigate={handleNavigate} currentPage={currentPage as any} />

        <div className="flex-grow">
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'creations' && <CreationsPage />}
          {currentPage === 'foundation' && <FoundationPage />}
          {currentPage === 'chatbot' && <ChatbotPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'terms' && <TermsPage />}
          {currentPage === 'privacy' && <PrivacyPage />}
        </div>

        {currentPage !== 'chatbot' && <Footer onNavigate={(page) => handleNavigate(page)} />}
      </main>
    );
  };

  return (
    <DataProvider>
      {renderContent()}
    </DataProvider>
  );
};

export default App;