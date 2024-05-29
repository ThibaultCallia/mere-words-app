import * as React from 'react';
import { useToast } from '@/components/ui/use-toast';

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
import { Loader2 } from 'lucide-react';
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
  const { toast } = useToast();
  const [loadingSaveWord, setLoadingSaveWord] = React.useState(false);

  const lastWord = wordStack.peek();

  const handleBackClick = () => {
    setWordStack((prev: WordStackObj<WordDetailInterface>) => prev.pop());
  };

  const handleGoDeeperClick = (word: string) => {
    setLoading(true);
    // setTimeout(() => {
    //   const mockApiResponse = [
    //     {
    //       word,
    //       phonetic: '/ˈtest/',
    //       phonetics: [{ text: '/ˈtest/' }],
    //       meanings: [
    //         {
    //           partOfSpeech: 'noun',
    //           definitions: [
    //             {
    //               definition: `Definition of ${word}`,
    //               example: `Example of ${word}`,
    //               synonyms: ['synonym1', 'synonym2'],
    //               antonyms: ['antonym1', 'antonym2'],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ];

    //   const result = processDictionaryData(mockApiResponse);
    //   if (typeof result === 'string') {
    //     toast({
    //       title: result,
    //     });
    //   } else {
    //     setWordStack((prev: WordStackObj<WordDetailInterface>) =>
    //       prev.push(result)
    //     );
    //   }
    //   setLoading(false);
    // }, 1000);

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
        console.error('Error:', error);
        // OTHER ERROR HANDLING
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSwitchChange = (e: boolean) => {
    setRabbitHole(e);
  };

  const handleSaveWord = async () => {
    const word = wordStack.peek();

    if (!word) {
      return;
    }
    setLoadingSaveWord(true);
    const wordData = {
      ...word,
      definition: JSON.stringify(word.definition),
    };

    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Word saved',
          description: data.message,
        });
      } else {
        const errorMessage = data.error || "Couldn't save word";

        toast({
          variant: 'destructive',
          title: 'Error saving word',
          description:
            typeof errorMessage === 'object'
              ? 'Fatal error. Try again later'
              : errorMessage,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        title:
          error instanceof Error ? error.message : 'Please try again later',
      });
    } finally {
      setLoadingSaveWord(false);
    }
  };

  return (
    <Card className="w-full flex flex-col flex-grow h-full ">
      <CardHeader className="flex ">
        <MyBreadcrumb words={wordStack.getAllWords()} />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        {loading ? (
          <div className="flex-grow ">
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
        <div className="flex  gap-2 ">
          <Button onClick={handleBackClick} variant="outline">
            Back
          </Button>
          <Button
            onClick={handleSaveWord}
            variant={'destructive'}
            disabled={loadingSaveWord}
          >
            {loadingSaveWord ? (
              <Loader2 className="animate-spin w-8" />
            ) : (
              'Save'
            )}
          </Button>
        </div>
        <div className="flex flex-reverse items-center  gap-2">
          <Label
            htmlFor="rabbitHoleSwitch"
            className="flex self-center text-xs"
          >
            <Image alt="rabbit logo" src={'/rabb.svg'} height={20} width={20} />
          </Label>
          <Switch
            onCheckedChange={handleSwitchChange}
            id="rabbitHoleSwitch"
          ></Switch>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DigDeeperCard;
