import React from 'react';
import { LogoIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-9 w-9 text-slate-200" />
            <span className="text-2xl font-bold text-slate-200 tracking-tight">Exceldes</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;