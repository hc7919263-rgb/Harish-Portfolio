import React from 'react';
import { GithubIcon } from '../components/icons/GithubIcon';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import Pencil from '../components/Pencil';
import ContactFormEmailJS from '@/components/ContactFormEmailJS';



const ContactPage: React.FC = () => {
  return (
    <section id="contact" className="py-28 bg-white text-black min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 text-center relative">
        <div className="relative inline-block w-full mb-8">
          <h2 className="text-4xl font-black text-black inline-block relative z-10">
            Get In Touch
          </h2>
          <Pencil className="left-[5%] top-[-10px] md:left-[10%] md:top-[-20px]" style={{ transform: 'scale(0.8) rotateY(180deg)' }} />
          <Pencil className="right-[5%] top-[-10px] md:right-[10%] md:top-[-20px]" style={{ transform: 'scale(0.8)' }} />
        </div>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
        </p>

        <div className="max-w-xl mx-auto text-left">
          <ContactFormEmailJS />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-12 flex-wrap">
          <a
            href="tel:+917030430756"
            className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Phone"
          >
            {/* @ts-ignore */}
            <AiOutlinePhone className="text-black w-6 h-6" />
          </a>
          <a
            href="https://wa.me/917030430756"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="WhatsApp"
          >
            {/* @ts-ignore */}
            <FaWhatsapp className="text-black w-6 h-6" />
          </a>
          <a
            href="mailto:hrchavan0402@gmail.com"
            className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="Email"
          >
            {/* @ts-ignore */}
            <AiOutlineMail className="text-black w-6 h-6" />
          </a>
          <a
            href="https://github.com/Harry-0402"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="GitHub"
          >
            <GithubIcon className="text-black w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/harish-chavan-a4248738b"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-200 rounded-full hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="text-black w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};


export default ContactPage;