import WordStack from './WordStack';

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
}

export interface DigDeeperCardInterface {
  wordStack: WordStack<WordDetailInterface>;
  loading: boolean;
}
