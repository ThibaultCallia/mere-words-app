'use client';
import * as React from 'react';
import AddWordForm from './AddWordForm';
import MySkeleton from './MySkeleton';
import DigDeeperCard from './DigDeeperCard';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WordStackObj from '../helpers/WordStackObj';
import { WordDetailInterface } from '@/helpers/interfaces';

const AddWordLogic = (props: any) => {
  const [wordStack, setWordStack] = useState(
    new WordStackObj<WordDetailInterface>()
  );
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <AddWordForm
        setLoading={setLoading}
        wordStack={wordStack}
        setWordStack={setWordStack}
        setActiveIndex={setActiveIndex}
      />
      {loading && wordStack.isEmpty() && (
        <Card>
          <CardContent>
            <MySkeleton />
          </CardContent>
        </Card>
      )}
      <DigDeeperCard
        wordStack={wordStack}
        loading={loading}
        setWordStack={setWordStack}
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
      />
    </div>
  );
};

export default AddWordLogic;
