import { useState } from 'react';
import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { WordResultPropsInterface } from '@/helpers/interfaces';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { isCommonShortWord } from '@/helpers/commonShortWords';
import { ScrollArea } from '@/components/ui/scroll-area';

import { WordDetailInterface } from '@/helpers/interfaces';

const WordResult: React.FC<WordResultPropsInterface> = ({
  result,
  rabbitHole,
  onGoDeeperClick,
}) => {
  const { word, phoneticText, definitions } = result;

  const handleGoDeeperClick = (word: string) => {
    setTimeout(() => {
      onGoDeeperClick(word);
    }, 300);
  };

  const renderIntoClickable = (
    text: string,
    handleGoDeeperClick: (word: string) => void,
    rabbitHole: boolean
  ) => {
    const wordRegex = /(\b\w+\b)([^\w\s]*)(\s*)/g;
    const parts = text.matchAll(wordRegex);

    return Array.from(parts).map((part, index) => {
      const word = part[1];
      const punctuation = part[2];
      const space = part[3];

      if (rabbitHole && !isCommonShortWord(word) && word.length > 2) {
        return (
          <React.Fragment key={index}>
            <Popover>
              <PopoverTrigger className="text-red-400 cursor-pointer">
                {word}
              </PopoverTrigger>
              <PopoverContent className="flex justify-center">
                <Button onClick={() => handleGoDeeperClick(word)}>
                  {`Look up '${word}'`}
                </Button>
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

  const renderDefinition = (
    wordDetail: WordDetailInterface,
    handleGoDeeperClick: (word: string) => void,
    rabbitHole: boolean
  ) => {
    return (
      <div className="overflow-y-auto">
        {wordDetail.definitions.map((def, index) => (
          <div key={index} className="mb-4">
            <p className="mb-1">
              <strong>{def.partOfSpeech} Definition:</strong>{' '}
              {renderIntoClickable(
                def.definition,
                handleGoDeeperClick,
                rabbitHole
              )}
            </p>
            {def.example && (
              <p className="mb-1">
                <strong>Example:</strong>{' '}
                {renderIntoClickable(
                  def.example,
                  handleGoDeeperClick,
                  rabbitHole
                )}
              </p>
            )}
            {def.synonyms.length > 0 && (
              <p className="mb-1">
                <strong>Synonyms:</strong> {def.synonyms.join(', ')}
              </p>
            )}
            {def.antonyms.length > 0 && (
              <p className="mb-1">
                <strong>Antonyms:</strong> {def.antonyms.join(', ')}
              </p>
            )}
          </div>
        ))}
      </div>
    );
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
        <ScrollArea className="h-40 pr-3">
          {renderDefinition(result, onGoDeeperClick, rabbitHole)}
        </ScrollArea>
      </CardContent>
    </>
  );
};

export default WordResult;
