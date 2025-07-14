import React from 'react';
import { LocationIcon, PhoneIcon, MailIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-12 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Exceldes</h3>
            <p className="text-slate-400 text-sm">Transforming spaces with AI-powered creativity and vision.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center md:justify-start space-x-3 text-slate-300 hover:text-[#C17D53] transition-colors">
                <LocationIcon className="h-5 w-5 flex-shrink-0" />
                <span>146, Akashneem Marg, DLF Phase 2, Gurugram, Haryana – 122022</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 text-slate-300 hover:text-[#C17D53] transition-colors">
                <PhoneIcon className="h-5 w-5 flex-shrink-0" />
                <span>9873577619</span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3 text-slate-300 hover:text-[#C17D53] transition-colors">
                <MailIcon className="h-5 w-5 flex-shrink-0" />
                <span>support@exceldes.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Credits</h3>
            <p className="text-slate-400 text-sm">Made and developed by Pratyush Kumar</p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500 text-xs">
          <p>&copy; {new Date().getFullYear()} Exceldes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;