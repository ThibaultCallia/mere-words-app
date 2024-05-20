'use client';

import HeaderLogo from '@/components/HeaderLogo';
import Nav from '@/components/Nav';

const Header = () => {
  return (
    <header className="bg-gray-800 px-4 py-6 lg:px-6 lg:py-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center">
          <div className="w-full flex  items-center lg:gap-x-16 justify-between px-6">
            <HeaderLogo />
            <Nav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
