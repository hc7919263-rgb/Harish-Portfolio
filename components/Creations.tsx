import React from 'react';
import { CreationCard } from './CreationCard';
import { useData } from '../context/DataContext';
import Pencil from './Pencil';

interface CreationsProps {
  onViewMore: () => void;
}

const Creations: React.FC<CreationsProps> = ({ onViewMore }) => {
  const { projects } = useData();

  // Show featured projects, or fallback to first 2 if none featured
  const featuredProjects = projects.filter(p => p.featured);

  const topCreations = featuredProjects.length > 0
    ? featuredProjects.slice(0, 4) // Show up to 4 featured
    : projects.slice(0, 2); // Fallback

  return (
    <section id="creations" className="pt-28 pb-8 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
        <div className="relative inline-block w-full text-center mb-12">
          <h2 className="text-4xl font-black text-black inline-block relative z-10">
            Top Creations
          </h2>
          <Pencil className="left-[10%] top-[-20px] md:left-[25%] md:top-[-30px]" style={{ transform: 'scale(0.8) rotateY(180deg)' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {topCreations.map((creation) => (
            <CreationCard
              key={creation.title}
              title={creation.title}
              description={creation.description}
              skills={creation.skills}
              url={creation.url}
              status={creation.status}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={onViewMore}
            className="text-lg font-medium text-gray-600 hover:text-black underline transition-colors duration-300"
          >
            Explore my other creations on the Creations page
          </button>
        </div>
      </div>
    </section>
  );
};

export default Creations;