'use client';
import * as React from 'react';
import AddWordForm from './AddWordForm';

import DigDeeperCard from './DigDeeperCard';
import { useState, useEffect } from 'react';

import WordStackObj from '../helpers/WordStackObj';
import { WordDetailInterface } from '@/helpers/interfaces';

const AddWordLogic = (props: any) => {
  const [wordStack, setWordStack] = useState(
    new WordStackObj<WordDetailInterface>()
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(wordStack);
  }, [wordStack]);

  return (
    <div className="flex flex-col gap-3">
      <AddWordForm
        setLoading={setLoading}
        wordStack={wordStack}
        setWordStack={setWordStack}
      />
      <DigDeeperCard wordStack={wordStack} loading={loading} />
    </div>
  );
};

export default AddWordLogic;
