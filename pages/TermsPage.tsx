import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <section className="pt-32 pb-20 bg-white min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-black text-black mb-8">Terms and Conditions</h1>
                <p className="text-gray-500 mb-8">Last Updated: December 2025</p>

                <div className="prose prose-lg text-gray-700">
                    <h3 className="text-xl font-bold text-black mt-8 mb-4">1. Introduction</h3>
                    <p>
                        Welcome to the portfolio website of Harish Chavan. By accessing our website, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">2. Intellectual Property Rights</h3>
                    <p>
                        Other than the content you own, under these Terms, Harish Chavan and/or his licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">3. Restrictions</h3>
                    <p>
                        You are specifically restricted from all of the following:
                    </p>
                    <ul className="list-disc pl-6 py-2 space-y-2">
                        <li>Publishing any Website material in any other media without credit;</li>
                        <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                        <li>Using this Website in any way that is or may be damaging to this Website;</li>
                        <li>Using this Website contrary to applicable laws and regulations.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">4. Content Liability</h3>
                    <p>
                        We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">5. Your Privacy</h3>
                    <p>
                        Please read our Privacy Policy.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">6. Governing Law</h3>
                    <p>
                        Any claim related to Harish Chavan's Website shall be governed by the laws of India without regard to its conflict of law provisions.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default TermsPage;
