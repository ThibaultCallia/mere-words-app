'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">
        About The Rabbit Hole Dictionary
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Card className="p-6 bg-white rounded-lg shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold mb-4">Project Info</h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              Personal project by Thibault Calliauw
            </p>
            <p className="text-lg mb-6">
              The Rabbit Hole Dictionary is an app designed to help you
              discover, save, and learn new words effortlessly. It uses the Free
              Dictionary API to fetch word definitions, phonetics, and more.
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              <ul className="list-disc list-inside">
                <li>Search for a word using the search bar.</li>
                <li>
                  Save any word you find interesting to your personal
                  dictionary.
                </li>
                <li>
                  {`Toggle the Rabbit Hole switch in the bottom-right corner to
                  explore further explanations of a word. Dive as deep "down the
                  rabbit hole" as you wish.`}
                </li>
                <li>
                  Every word you encounter can be added to your dictionary for
                  future reference.
                </li>
              </ul>
            </p>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold mb-4">Technologies</h2>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">
              The Rabbit Hole Dictionary leverages modern technologies to
              provide a seamless experience:
            </p>
            <ul className="list-disc list-inside mt-4">
              <li>Free Dictionary API for comprehensive word definitions.</li>
              <li>React and Next.js for a dynamic and responsive frontend.</li>
              <li>Neon Database for efficient and scalable data storage.</li>
              <li>
                Drizzle ORM for elegant and type-safe database interactions.
              </li>
              <li>
                Shad CN UI component library for a cohesive and accessible
                design.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white rounded-lg shadow-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold mb-4">GitHub</h2>
          </CardHeader>
          <CardContent className="flex justify-start">
            <Link href="https://github.com/thibaultCallia/">
              <Button variant="outline" className="flex  gap-2">
                <FaGithub className="w-5 h-5" />
                <span>View on GitHub</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
