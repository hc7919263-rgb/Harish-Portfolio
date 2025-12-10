import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <section className="pt-32 pb-20 bg-white min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-black text-black mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">Last Updated: December 2025</p>

                <div className="prose prose-lg text-gray-700">
                    <p className="mb-6">
                        Your privacy is important to us. It is Harish Chavan's policy to respect your privacy regarding any information we may collect from you across our website.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">1. Information We Collect</h3>
                    <p>
                        We may ask for personal information, such as your:
                    </p>
                    <ul className="list-disc pl-6 py-2 space-y-2">
                        <li>Name</li>
                        <li>Email</li>
                        <li>Phone number</li>
                    </ul>
                    <p>
                        This information is collected only when you knowingly and voluntarily provide it to us, for example, when contacting us via the contact form.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">2. Integration with Third-Party Services</h3>
                    <p>
                        We use EmailJS to handle contact form submissions. By using our contact form, you acknowledge that the information you provide will be transferred to EmailJS for processing in accordance with their Privacy Policy and Terms of Use.
                    </p>
                    <p className="mt-2">
                        We may also use Google Analytics to analyze traffic. This service may use cookies to collect anonymous usage data.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">3. Security</h3>
                    <p>
                        We take reasonable steps to protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, please be aware that no method of electronic transmission or storage is 100% secure.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">4. External Links</h3>
                    <p>
                        Our website may link to external sites that are not operated by us (e.g., GitHub, LinkedIn). Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                    </p>

                    <h3 className="text-xl font-bold text-black mt-8 mb-4">5. Contact Us</h3>
                    <p>
                        If you have any questions about how we handle user data and personal information, feel free to contact us via the contact form on this website.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PrivacyPage;
