import WordStack from './WordStackObj';

export interface WordDetailInterface {
  id?: number;
  date_added?: string;
  word: string;
  phonetic_text: string;
  definition: Array<{
    partOfSpeech: string;
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
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
