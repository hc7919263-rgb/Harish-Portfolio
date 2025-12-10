import React, { useEffect, useRef, useState } from 'react';
import Pencil from './Pencil';
import { useData } from '../context/DataContext';

interface Skill {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<{ skill: Skill; isVisible: boolean }> = ({ skill, isVisible }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-base font-medium text-black">{skill.name}</span>
      <span className="text-sm font-medium text-gray-600">{skill.percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div
        className={`bg-black h-2.5 rounded-full transition-all duration-1000 ease-out`}
        style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}
      ></div>
    </div>
  </div>
);

const Skills: React.FC = () => {
  const { skills } = useData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <>
      <section id="technical-skills" ref={sectionRef} className="pt-12 pb-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
          <div className="relative inline-block w-full text-center mb-16">
            <h2 className="text-4xl font-black text-black inline-block relative z-10">
              Technical Skills
            </h2>
            <Pencil className="left-[10%] top-[-20px] md:left-[20%] md:top-[-30px]" style={{ transform: 'scale(0.8) rotateY(180deg)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl mx-auto">
            {skills.technical.map((skill) => (
              <SkillBar key={skill.name} skill={skill} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </section>

      <section id="professional-skills" className="pt-12 pb-20 bg-white relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">
          <div className="relative inline-block w-full text-center mb-16">
            <h2 className="text-4xl font-black text-black inline-block relative z-10">
              Professional Skills
            </h2>
            <Pencil className="right-[10%] top-[-20px] md:right-[20%] md:top-[-30px]" style={{ transform: 'scale(0.8)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl mx-auto">
            {skills.soft.map((skill) => (
              <SkillBar key={skill.name} skill={skill} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;