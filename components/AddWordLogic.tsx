'use client';

import AddWordForm from './AddWordForm';
import DigDeeperCard from './DigDeeperCard';
import { useState, useEffect } from 'react';

import Stack from '../helpers/Stack';

const AddWordLogic = (props: any) => {
  const [wordStack, setWordStack] = useState<string[]>([]);
  useEffect(() => {
    console.log(wordStack);
  }, [wordStack]);

  return (
    <div className="flex flex-col gap-3">
      <AddWordForm wordStack={wordStack} setWordStack={setWordStack} />
      <DigDeeperCard wordStack={wordStack} />
    </div>
  );
};

export default AddWordLogic;
