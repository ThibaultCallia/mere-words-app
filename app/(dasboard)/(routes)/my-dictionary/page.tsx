'use client';

import { useGetWords } from '@/custom-hooks/words/api/use-get-words';
import { columns } from '@/components/tableColumns';
import { DataTable } from '@/components/DataTable';
import { WordDetailInterface } from '@/helpers/interfaces';
import { Loader } from 'lucide-react';

const MyDictionary = () => {
  const { data = [], isLoading, error } = useGetWords();

  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">My Dictionary</h1>
      <div className="container mx-auto py-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin w-10 h-10 text-gray-500" />
          </div>
        ) : (
          <DataTable columns={columns} data={data as WordDetailInterface[]} />
        )}
      </div>
    </div>
  );
};

export default MyDictionary;
