'use client';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!wordStack.isEmpty()) {
      setWordStack(new WordStackObj<WordDetailInterface>());
    }

    setLoading(true);
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = processDictionaryData(data);
        if (typeof result === 'string') {
          toast({
            variant: 'destructive',
            title: result,
            description: 'Check spelling or try again later',
          });
        } else {
          setWordStack((prev: WordStackObj<WordDetailInterface>) =>
            prev.push(result)
          );
        }
      })
      .catch((error) => {
        toast({
          title: 'Word not found',
          description: 'Check spelling or try again later',
        });
        console.error('Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
    // setTimeout(() => {
    //   const result = processDictionaryData(pickRandom());

    //   if (typeof result === 'string') {
    //     toast({ title: result });
    //   } else {
    //     setWordStack((prev: WordStackObj<WordDetailInterface>) =>
    //       prev.push(result)
    //     );
    //   }
    //   setLoading(false);
    // }, 500);

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
      />
      <Button disabled={word.length === 0} type="submit">
        {wordStack.isEmpty() ? 'Look Up' : 'Start Over'}
      </Button>
    </form>
  );
};

export default AddWordForm;
