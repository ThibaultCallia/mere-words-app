'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMedia } from 'react-use';
import { useState } from 'react';
import { Loader2, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NavBtn from '@/components/NavBtn';
import {
  UserButton,
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from '@clerk/nextjs';

const routes = [
  {
    href: '/',
    label: 'Home',
    mustBeSignedIn: false,
  },
  {
    href: '/about',
    label: 'About',
    mustBeSignedIn: false,
  },
  {
    href: '/add-word',
    label: 'Add Word',
    mustBeSignedIn: true,
  },
  {
    href: '/my-dictionary',
    label: 'My Dictionary',
    mustBeSignedIn: true,
  },
  {
    href: '/practice-cards',
    label: 'Practice Cards',
    mustBeSignedIn: true,
  },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia('(max-width: 1024px)', true);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const renderNavLinks = () =>
    routes.map((route) =>
      route.mustBeSignedIn ? (
        <SignedIn key={route.href}>
          <Button
            className="w-full justify-end"
            variant={route.href === pathname ? 'secondary' : 'ghost'}
            onClick={() => onClick(route.href)}
          >
            {route.label}
          </Button>
        </SignedIn>
      ) : (
        <Button
          className="w-full justify-end"
          key={route.href}
          variant={route.href === pathname ? 'secondary' : 'ghost'}
          onClick={() => onClick(route.href)}
        >
          {route.label}
        </Button>
      )
    );

  if (isMobile) {
    return (
      <div className="flex gap-4">
        <SignedIn>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-6 animate-spin text-slate-200" />
          </ClerkLoading>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="px-2">
            <nav className="flex flex-col gap-y-2 pt-6">{renderNavLinks()}</nav>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
        {routes.map((route) =>
          route.mustBeSignedIn ? (
            <SignedIn key={route.href}>
              <NavBtn
                href={route.href}
                label={route.label}
                isActive={pathname === route.href}
              />
            </SignedIn>
          ) : (
            <NavBtn
              key={route.href}
              href={route.href}
              label={route.label}
              isActive={pathname === route.href}
            />
          )
        )}
      </nav>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant="outline" size="sm">
            Log On
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Nav;
