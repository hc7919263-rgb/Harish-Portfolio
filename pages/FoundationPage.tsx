import React from 'react';
import Pencil from '../components/Pencil';
import { useData } from '../context/DataContext';

const FoundationPage: React.FC = () => {
    const { foundation: foundationData } = useData();
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    return (
        <section className="py-28 bg-white min-h-screen">
            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt="Certificate"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            loading="lazy"
                        />
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative">

                {/* Header */}
                <div className="relative inline-block w-full text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black text-black inline-block relative z-10">
                        My Foundation
                    </h2>
                    <Pencil className="left-[5%] top-[-10px] md:left-[10%] md:top-[-20px]" style={{ transform: 'scale(0.8) rotateY(180deg)' }} />
                    <Pencil className="right-[5%] top-[-10px] md:right-[10%] md:top-[-20px]" style={{ transform: 'scale(0.8)' }} />
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Academic Timeline Section */}
                    <div className="mb-20">
                        <h3 className="text-3xl font-bold text-black mb-12 text-center">Academic Journey</h3>
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-black md:-ml-[1px]"></div>

                            {foundationData.academic.map((item, index) => (
                                <div key={index} className="mb-12 relative w-full flex items-center">
                                    {/* Dot */}
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-black rounded-full border-4 border-white -ml-[8px] z-10"></div>

                                    {/* Content Wrapper */}
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'} pl-20 md:pl-0`}>
                                        <div className={`${index % 2 !== 0 ? 'md:pl-0' : ''}`}>
                                            <span className="inline-block px-3 py-1 bg-black text-white text-sm font-bold rounded-full mb-2">
                                                {item.year}
                                            </span>
                                            <h4 className="text-xl font-bold text-black mb-1">{item.degree}</h4>
                                            <p className="text-lg text-blue-600 font-medium mb-2">{item.institution}</p>
                                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Timeline Section */}
                    <div className="mb-20">
                        <h3 className="text-3xl font-bold text-black mb-12 text-center">Courses & Training</h3>
                        <div className="relative">
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-black md:-ml-[1px]"></div>

                            {foundationData.certifications.map((cert, index) => (
                                <div key={index} className="mb-10 relative w-full flex items-center">
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-black rounded-full border-4 border-white -ml-[8px] z-10"></div>

                                    <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'} pl-20 md:pl-0`}>
                                        <div
                                            className={`bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 ${cert.image ? 'cursor-pointer hover:border-blue-300 transform hover:-translate-y-1' : ''}`}
                                            onClick={() => cert.image && setSelectedImage(cert.image)}
                                        >
                                            <h4 className="text-lg font-bold text-black mb-2 flex items-center gap-2">
                                                {cert.title}
                                                {cert.image && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                )}
                                            </h4>
                                            <div className={`flex flex-col gap-2 text-sm text-gray-600 ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between`}>
                                                <span className="font-medium">{cert.issuer}</span>
                                                <span className="bg-gray-200 px-3 py-1 rounded text-xs font-medium inline-flex items-center justify-center min-w-[70px]">{cert.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Extracurricular Activities Timeline Section */}
                    <div>
                        <h3 className="text-3xl font-bold text-black mb-12 text-center">Extracurricular Activities</h3>
                        <div className="relative">
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-black md:-ml-[1px]"></div>

                            {foundationData.activities.map((activity, index) => (
                                <div key={index} className="mb-12 relative w-full flex items-center">
                                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-black rounded-full border-4 border-white -ml-[8px] z-10"></div>

                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'} pl-20 md:pl-0`}>
                                        <span className="text-gray-500 text-sm font-bold mb-1 block">{activity.year}</span>
                                        <h4 className="text-xl font-bold text-black">{activity.role}</h4>
                                        <p className="text-lg text-blue-600 font-medium mb-2">{activity.organization}</p>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{activity.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FoundationPage;
