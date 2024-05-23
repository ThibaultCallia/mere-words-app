'use client';

import { Card } from '@/components/ui/card';
import { useGetWords } from '@/custom-hooks/words/api/use-get-words';

const MyDictionary = () => {
  const { data, isLoading, error } = useGetWords();

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">My Dictionary</h1>
      <Card className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-200">
          {isLoading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.message}</p>}
          {data &&
            data.map((word) => (
              <li key={word.id} className="py-4">
                <p className="text-lg font-medium">{word.word}</p>
              </li>
            ))}
        </ul>
      </Card>
    </div>
  );
};

export default MyDictionary;
