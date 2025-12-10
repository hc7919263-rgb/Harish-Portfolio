import React from 'react';

interface SplitPageLayoutProps {
    leftContent: React.ReactNode;
    rightContent: React.ReactNode;
    rightClassName?: string;
}

const SplitPageLayout: React.FC<SplitPageLayoutProps> = ({
    leftContent,
    rightContent,
    rightClassName = ''
}) => {
    return (
        <section className="w-full bg-white flex flex-col md:flex-row min-h-screen overflow-hidden">
            {/* Left Column: Fixed Content */}
            <div className="w-full md:w-[50%] flex items-center justify-center px-6 lg:px-12 pt-28 pb-16 md:pt-16 md:pb-0 relative z-10 bg-white">
                <div className="max-w-md w-full relative">
                    {leftContent}
                </div>
            </div>

            {/* Right Column: Dynamic/Scrollable Content */}
            <div
                className={`flex w-full md:w-[50%] items-center relative group ${rightClassName}`}
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
            >
                {/* Mobile: Solid background handled by parent bg-black */}

                {/* Desktop: Slant Overlay - Using the parent's logic now since we removed bg-black from parent 
                    Wait, if parent has clip-path and no bg, where is the color coming from?
                    The color should come from this inner div or the parent if we want the shape.
                    Actually, if we want the "tiled" (angled) plane, the simplified approach is:
                    Parent is container. 
                    Inner Div is the black shape with clip-path.
                */}
                <div
                    className="absolute inset-0 bg-black hidden md:block"
                    style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
                ></div>

                <div className="w-full md:w-[69%] ml-auto md:h-[75vh] text-gray-300 relative overflow-hidden px-8 py-16 md:py-0 md:px-0 md:pr-12 lg:pr-24 z-10 w-full">
                    {rightContent}
                </div>
            </div>
        </section>
    );
};

export default SplitPageLayout;
