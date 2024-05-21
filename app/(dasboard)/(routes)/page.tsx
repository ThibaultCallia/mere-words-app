'use client';

import Navbar from '@/components/Nav';
import { useGetWords } from '@/features/words/api/use-get-words';
import Image from 'next/image';

export default function Home() {
  // const wordsQuery = useGetWords();

  return (
    <div>
      <h1>Home</h1>
      {/* {wordsQuery.data?.map((word) => {
        return <p key={word.id}>{word.word}</p>;
      })} */}
    </div>
  );
}
