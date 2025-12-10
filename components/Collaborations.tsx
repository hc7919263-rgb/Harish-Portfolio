import React from 'react';
import Pencil from './Pencil';
import { useData } from '../context/DataContext';

interface CollaborationsProps {
  onNavigate: (page: 'contact') => void;
}

const Collaborations: React.FC<CollaborationsProps> = ({ onNavigate }) => {
  const { collaborations } = useData();

  return (
    <section className="pt-20 pb-20 bg-white border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
        <div className="relative inline-block w-full text-center mb-12">
          <h2 className="text-4xl font-black text-black inline-block relative z-10">
            Top Collaborations
          </h2>
          <Pencil className="right-[10%] top-[-20px] md:right-[25%] md:top-[-30px]" style={{ transform: 'scale(0.8)' }} />
        </div>

        {collaborations && collaborations.length > 0 ? (
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {collaborations.map((collab) => (
                <a
                  key={collab.id}
                  href={collab.url || '#'}
                  target={collab.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                    {collab.imageUrl ? (
                      <img src={collab.imageUrl} alt={collab.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl font-bold text-gray-300">{collab.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-black text-center mb-1">{collab.name}</h3>
                  {collab.role && <p className="text-sm text-gray-500 text-center">{collab.role}</p>}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 shadow-sm text-center border border-gray-100 mb-12">
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              I don't have any collaborations listed yet, but I am always open to working with fellow developers, researchers, and businesses.
              If you have an idea or a project, let's connect!
            </p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-block bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collaborations;