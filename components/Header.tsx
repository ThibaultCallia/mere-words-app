'use client';

import HeaderLogo from '@/components/HeaderLogo';
import Nav from '@/components/Nav';

const Header = () => {
  return (
    <header className="bg-gray-800 px-4 pt-2 pb-6 lg:px-6 lg:py-10 lg:relative lg:w-auto fixed top-0 w-full z-50">
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
