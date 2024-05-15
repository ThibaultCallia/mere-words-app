'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { processDictionaryData } from '@/helpers/helperFunctions';
import { pickRandom } from '@/helpers/data';
import WordStackObj from '@/helpers/WordStackObj';
import {
  WordDetailInterface,
  AddWordFormPropsInterface,
} from '@/helpers/interfaces';

const AddWordForm: React.FC<AddWordFormPropsInterface> = ({
  setWordStack,
  setLoading,
  wordStack,
}) => {
  // State to hold the input value
  const [word, setWord] = useState('');

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     const wordDetail = processDictionaryData(data);
    //     if (wordDetail) {
    //       console.log(wordDetail);
    //       props.setWordStack([...props.wordStack, wordDetail.word]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   })
    //   .finally(() => {
    //     props.setLoading(false);
    //   });
    setTimeout(() => {
      const wordDetail = processDictionaryData(pickRandom());
      if (wordDetail) {
        setWordStack((prev: WordStackObj<WordDetailInterface>) =>
          prev.push(wordDetail)
        );
      }
      setLoading(false);
    }, 2000);

    setWord('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
        className="border rounded p-2 text-lg"
        disabled={!wordStack.isEmpty()}
      />
      <Button disabled={word.length === 0} type="submit">
        Look Up
      </Button>
    </form>
  );
};

export default AddWordForm;
