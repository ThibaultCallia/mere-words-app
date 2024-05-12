'use client';

import { useState } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <p className="text-xl font-bold">Logo</p>
        </Link>
        <div className="md:hidden">
          <Button onClick={toggleMenu}>{isOpen ? 'Close' : 'Menu'}</Button>
        </div>
        <div
          className={`md:flex md:items-center md:justify-between ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <SignedOut>
            <Link href="/about">
              <p className="p-2">About</p>
            </Link>
            <SignInButton mode="modal">Log In</SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/profile">
              <p className="p-2">Profile</p>
            </Link>
            <Link href="/myWords">
              <p className="p-2">My Words</p>
            </Link>
            <Link href="/practise">
              <p className="p-2">Practise</p>
            </Link>
            <Link href="/about">
              <p className="p-2">About</p>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
