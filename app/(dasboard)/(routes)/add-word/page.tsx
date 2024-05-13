import { useState } from 'react';
import AddWordLogic from '@/components/AddWordLogic';

const addWord = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <h1 className="text-center text-2xl font-bold">Mere Words</h1>
        <AddWordLogic />
      </div>
    </div>
  );
};

export default addWord;
