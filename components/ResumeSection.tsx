import React from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import Pencil from './Pencil';
import { useData } from '../context/DataContext';

const ResumeSection: React.FC = () => {
    // @ts-ignore
    const { meta } = useData();

    const formattedDate = meta?.resumeLastUpdated
        ? new Date(meta.resumeLastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'December 2025';

    return (
        <section id="resume-section" className="pt-12 pb-20 bg-white border-t border-gray-100">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12 text-center">

                <div className="relative inline-block w-full text-center mb-12">
                    <h2 className="text-4xl font-black text-black inline-block relative z-10">
                        My Resume
                    </h2>
                    <Pencil className="left-[10%] top-[-20px] md:left-[25%] md:top-[-30px]" style={{ transform: 'scale(0.8) rotateY(180deg)' }} />
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm text-center border border-gray-100 max-w-4xl mx-auto">
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Interested in my journey? Download my resume to see a concise overview of my experience, skills, and education.
                    </p>

                    <div className="flex flex-col items-center justify-center">
                        <a
                            href="/api/download-resume"
                            download="Harish_Chavan_Resume.pdf"
                            aria-label="Download Resume (PDF)"
                            className="inline-flex bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 items-center justify-center gap-2 group"
                        >
                            {/* @ts-ignore */}
                            <AiOutlineDownload className="w-6 h-6 group-hover:animate-bounce" />
                            <span>Download Resume (PDF)</span>
                        </a>
                        <p className="mt-6 text-sm text-gray-500">
                            Last Updated: {formattedDate}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResumeSection;
