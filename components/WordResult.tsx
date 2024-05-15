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
  const renderDefinition = (definition: string) => {
    // Split the definition into words, keeping the punctuation and spaces
    const wordRegex = /(\b\w+\b|[^\w\s]+)/g;
    const parts = definition.match(wordRegex) || [];

    return parts.map((part, index) => {
      if (rabbitHole && !isCommonShortWord(part) && /\b\w+\b/.test(part)) {
        return (
          <React.Fragment key={index}>
            <Popover>
              <PopoverTrigger className="text-blue-500 cursor-pointer">
                {part}
              </PopoverTrigger>
              <PopoverContent>
                <Button>{`Look up "${part}"`}</Button>
              </PopoverContent>
            </Popover>
            {part.match(/[^\w\s]/) ? null : ' '}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {part.match(/[^\w\s]/) ? part : `${part} `}
          </React.Fragment>
        ); // Ensure space is preserved
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
