import MyBreadcrumb from '@/components/MyBreadCrumb';
import WordStack from './WordStackObj';
import { CardContent } from '@/components/ui/card';

export interface WordDetailInterface {
  word: string;
  phoneticText: string;
  definitions: Array<{
    partOfSpeech: string;
    definition: string;
  }>;
}

export interface AddWordFormPropsInterface {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  wordStack: WordStack<WordDetailInterface>;
  setWordStack: React.Dispatch<
    React.SetStateAction<WordStack<WordDetailInterface>>
  >;
  onWordAdded: () => void;
}

export interface DigDeeperCardInterface {
  wordStack: WordStack<WordDetailInterface>;
  loading: boolean;
  setWordStack: React.Dispatch<
    React.SetStateAction<WordStack<WordDetailInterface>>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MyBreadcrumbPropsInterface {
  words: string[];
}

export interface WordResultPropsInterface {
  result: WordDetailInterface;
  rabbitHole: boolean;
  onGoDeeperClick: (word: string) => void;
}

export interface MyPopoverPropsInterface {
  word: string;
  isOpen: boolean;
  handleGoDeeperClick: (word: string) => void;
  onOpenChange: (isOpen: boolean | null) => void;
}
