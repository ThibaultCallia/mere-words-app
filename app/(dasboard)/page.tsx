'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 ">
      <div className="max-w-2xl text-center p-6 bg-white rounded-lg shadow-lg mt-10 mx-3 ">
        <h1 className="text-4xl font-bold mb-4 ">
          Welcome to The Rabbit Hole Dictionary
        </h1>
        <p className="text-lg mb-6">
          Discover, save, and learn new words effortlessly. Explore our features
          and enhance your vocabulary.
        </p>
        <Link href="/add-word">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
