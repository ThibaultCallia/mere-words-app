import * as React from 'react';
import { useEffect } from 'react';
import { WordDetailInterface } from '@/helpers/interfaces';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import WordStackObj from '@/helpers/WordStackObj';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { processDictionaryData } from '@/helpers/helperFunctions';

import { Label } from '@/components/ui/label';

import MySkeleton from './MySkeleton';
import MyBreadcrumb from './MyBreadCrumb';
import WordResult from './WordResult';
import { DigDeeperCardInterface } from '@/helpers/interfaces';

const DigDeeperCard: React.FC<DigDeeperCardInterface> = ({
  wordStack,
  loading,
  setWordStack,
  setLoading,
}) => {
  const [rabbitHole, setRabbitHole] = React.useState(false);

  const lastWord = wordStack.peek();

  const handleBackClick = () => {
    setWordStack((prev: WordStackObj<WordDetailInterface>) => prev.pop());
  };

  const handleGoDeeperClick = (word: string) => {
    setLoading(true);
    setTimeout(() => {
      const mockApiResponse = [
        {
          word,
          phonetic: '/ˈtest/',
          phonetics: [{ text: '/ˈtest/', audio: '' }],
          meanings: [
            {
              partOfSpeech: 'noun',
              definitions: [
                {
                  definition: `Definition of ${word}`,
                  example: `Example of ${word}`,
                  synonyms: ['synonym1', 'synonym2'],
                  antonyms: ['antonym1', 'antonym2'],
                },
              ],
            },
          ],
        },
      ];

      const newWordDetail = processDictionaryData(mockApiResponse);
      if (newWordDetail) {
        setWordStack((prev: WordStackObj<WordDetailInterface>) =>
          prev.push(newWordDetail)
        );
      }
      setLoading(false);
    }, 1000);

    //   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       const wordDetail = processDictionaryData(data);
    //       if (wordDetail) {
    //         setWordStack((prev: WordStackObj<WordDetailInterface>) =>
    //           prev.push(wordDetail)
    //         );
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
  };

  const handleSwitchChange = (e: boolean) => {
    setRabbitHole(e);
  };

  return (
    <Card className="w-full flex flex-col flex-grow">
      <CardHeader className="flex">
        <MyBreadcrumb words={wordStack.getAllWords()} />
      </CardHeader>
      <CardContent className="flex-grow">
        {loading ? (
          <div className="">
            <MySkeleton />
          </div>
        ) : (
          lastWord && (
            <WordResult
              onGoDeeperClick={handleGoDeeperClick}
              result={lastWord}
              rabbitHole={rabbitHole}
            />
          )
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex  gap-2">
          <Button onClick={handleBackClick} variant="outline">
            Back
          </Button>
          <Button variant={'destructive'}>Save</Button>
        </div>
        <div className="flex flex-reverse items-center  gap-2">
          {/* <Label
            htmlFor="rabbitHoleSwitch"
            className="flex self-center text-xs"
          >
            <Image alt="rabbit logo" src={'/rabb.jpg'} height={20} width={20} />
          </Label> */}
          <Switch onCheckedChange={handleSwitchChange} id="rabbitHoleSwitch">
            test
          </Switch>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DigDeeperCard;
