'use client';
import * as React from 'react';
import AddWordForm from './AddWordForm';
import MySkeleton from './MySkeleton';
import DigDeeperCard from './DigDeeperCard';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WordStackObj from '../helpers/WordStackObj';
import { WordDetailInterface } from '@/helpers/interfaces';

const AddWordLogic = ({ userId }: any) => {
  const [wordStack, setWordStack] = useState(
    new WordStackObj<WordDetailInterface>()
  );
  const [loading, setLoading] = useState(false);

  const handleWordAdded = () => {
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 flex-grow h-full">
      <AddWordForm
        setLoading={setLoading}
        wordStack={wordStack}
        setWordStack={setWordStack}
        onWordAdded={handleWordAdded}
      />
      {loading && wordStack.isEmpty() && (
        <Card>
          <CardContent>
            <MySkeleton />
          </CardContent>
        </Card>
      )}
      {!wordStack.isEmpty() && (
        <div className="flex flex-col flex-grow">
          <DigDeeperCard
            wordStack={wordStack}
            loading={loading}
            setWordStack={setWordStack}
            setLoading={setLoading}
            userId={userId}
          />
        </div>
      )}
    </div>
  );
};

export default AddWordLogic;
