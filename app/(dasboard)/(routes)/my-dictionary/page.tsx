'use client';

import { useGetWords } from '@/features/words/api/use-get-words';

const MyDictionary = () => {
  const { data, isLoading, error } = useGetWords();

  return (
    <div>
      <ul>
        {isLoading && <p>Loading...</p>}

        {data && data.map((word) => <li key={word.id}>{word.word}</li>)}
      </ul>
    </div>
  );
};

export default MyDictionary;
