import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { CreationCard } from '../components/CreationCard';
import { SearchIcon } from '../components/icons/SearchIcon';
import Pencil from '../components/Pencil';

const categories = ['Projects', 'Handbooks', 'Blogs', 'Case Studies', 'Research papers'];
const comingSoonCategories = ['Blogs', 'Case Studies', 'Research papers'];

const CreationsPage: React.FC = () => {
  const { projects } = useData(); // Use Context State
  const [activeCategory, setActiveCategory] = useState('Projects');
  const [searchQuery, setSearchQuery] = useState('');

  const isComingSoon = comingSoonCategories.includes(activeCategory);

  const filteredCreations = useMemo(() => {
    if (isComingSoon) return [];

    return projects
      .filter((project) => project.category === activeCategory)
      .filter((project) => {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.skills.some(skill => skill.toLowerCase().includes(query))
        );
      });
  }, [activeCategory, searchQuery, isComingSoon]);

  return (
    <section id="creations-page" className="py-28 bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
        <div className="relative inline-block w-full text-center mb-6">
          <h2 className="text-4xl lg:text-5xl font-black text-black inline-block relative z-10">
            All My Creations
          </h2>
          <Pencil className="left-[5%] top-[-10px] md:left-[10%] md:top-[-20px]" style={{ transform: 'scale(0.8) rotateY(180deg)' }} />
          <Pencil className="right-[5%] top-[-10px] md:right-[10%] md:top-[-20px]" style={{ transform: 'scale(0.8)' }} />
        </div>

        {/* Category Switcher */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-2 px-4 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creations..."
              className="w-full py-3 pl-12 pr-4 bg-gray-100 text-black border-2 border-transparent focus:border-black rounded-full outline-none transition-colors duration-300 text-center"
              disabled={isComingSoon}
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <SearchIcon className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Creations Grid */}
        {isComingSoon ? (
          <div className="text-center py-16">
            <p className="text-3xl font-bold text-black mb-4">Coming Soon!</p>
            <p className="text-lg text-gray-500">
              I'm working on new content for this section. Please check back later.
            </p>
          </div>
        ) : filteredCreations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCreations.map((project) => (
              <CreationCard
                key={project.title}
                title={project.title}
                description={project.description}
                skills={project.skills}
                url={project.url}
                status={project.status}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No creations found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreationsPage;