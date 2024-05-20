'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMedia } from 'react-use';
import NavBtn from '@/components/NavBtn';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
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
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/add-word',
    label: 'Add Word',
  },
  {
    href: '/my-dictionary',
    label: 'My Dictionary',
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
            <nav className="flex flex-col gap-y-2 pt-6">
              {routes.map((route) => (
                <Button
                  className="w-full justify-end"
                  key={route.href}
                  variant={route.href === pathname ? 'secondary' : 'ghost'}
                  // onclick io href as function above also closes trigger
                  onClick={() => {
                    onClick(route.href);
                  }}
                >
                  {route.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto ">
        {routes.map((route) => (
          <NavBtn
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}
          />
        ))}
      </nav>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default Nav;
