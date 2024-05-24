import { WordDetailInterface } from './interfaces';
import { currentUser } from '@clerk/nextjs/server';

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }
  return user;
};

export function processDictionaryData(data: any): WordDetailInterface | string {
  if (Array.isArray(data)) {
    if (data.length === 0 || data[0].title) {
      return 'No Definitions Found';
    }

    const firstEntry = data[0];
    const wordDetail: WordDetailInterface = {
      word: firstEntry.word,
      phonetic_text: firstEntry.phonetic || '',
      definition: [],
    };

    firstEntry.meanings.forEach((meaning: any) => {
      const limitedDefinitions = meaning.definitions.slice(0, 2); // Limit to 2 definitions per part of speech
      limitedDefinitions.forEach((def: any) => {
        wordDetail.definition.push({
          partOfSpeech: meaning.partOfSpeech,
          definition: def.definition,
          example: def.example || '',
          synonyms: def.synonyms || [],
          antonyms: def.antonyms || [],
        });
      });
    });

    return wordDetail;
  } else if (data.title) {
    return data.title;
  } else {
    return 'No Definitions Found';
  }
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const capitalise = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
