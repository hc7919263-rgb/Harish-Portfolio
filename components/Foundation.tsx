import React from 'react';

const Foundation: React.FC = () => {
  return (
    <section id="foundation" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black text-center text-black mb-12">
          Foundation
        </h2>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
               <div>
                   <h3 className="text-2xl font-bold text-black">Sandip University</h3>
                   <p className="text-gray-600 font-medium text-lg">Business Analytics</p>
               </div>
               <span className="mt-2 md:mt-0 px-4 py-1 bg-black text-white rounded-full text-sm font-medium">Present</span>
           </div>
           <p className="text-gray-600 leading-relaxed">
               Currently pursuing in-depth studies in Business Analytics, focusing on data-driven decision making, statistical analysis, and predictive modeling to solve real-world business problems.
           </p>
        </div>
      </div>
    </section>
  );
};

export default Foundation;