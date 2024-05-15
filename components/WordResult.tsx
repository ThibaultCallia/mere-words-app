import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  WordResultPropsInterface,
  WordDetailInterface,
} from '@/helpers/interfaces';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { isCommonShortWord } from '@/helpers/commonShortWords';
import React from 'react';

const WordResult: React.FC<WordResultPropsInterface> = ({
  result,
  rabbitHole,
}) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const { word, phoneticText, definitions } = result;

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  const handleGoDeeperClick = (word: string) => {
    console.log(word);
  };

  const renderDefinition = (definition: string) => {
    // Split the definition into words, keeping the punctuation and spaces
    const wordRegex = /(\b\w+\b)([^\w\s]*)(\s*)/g;
    const parts = definition.matchAll(wordRegex);

    return Array.from(parts).map((part, index) => {
      const word = part[1];
      const punctuation = part[2];
      const space = part[3];

      if (rabbitHole && !isCommonShortWord(word)) {
        return (
          <React.Fragment key={index}>
            <Popover>
              <PopoverTrigger className="text-red-400 cursor-pointer">
                {word}
              </PopoverTrigger>
              <PopoverContent className="flex justify-center">
                <Button
                  onClick={() => handleGoDeeperClick(word)}
                >{`Look up '${word}'`}</Button>
              </PopoverContent>
            </Popover>
            {punctuation}
            {space}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {word}
            {punctuation}
            {space}
          </React.Fragment>
        );
      }
    });
  };

  return (
    <>
      <CardHeader className="flex py-0.5 text-2xl">
        <CardTitle className="flex items-baseline">
          {word}
          <span className="text-sm italic text-gray-400 ml-2">
            {phoneticText}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <CardDescription>
          {renderDefinition(definitions[0].definition)}
        </CardDescription>
      </CardContent>
    </>
  );
};

export default WordResult;
