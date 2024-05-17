import exp from 'constants';
import { WordDetailInterface } from './interfaces';

export function processDictionaryData(data: any[]): WordDetailInterface | null {
  if (!data || data.length === 0 || data[0].title === 'No Definitions Found') {
    return null;
  }

  const firstEntry = data[0];
  const wordDetail: WordDetailInterface = {
    word: firstEntry.word,
    phoneticText: firstEntry.phonetic || '',
    definitions: [],
  };

  firstEntry.meanings.forEach((meaning: any) => {
    const limitedDefinitions = meaning.definitions.slice(0, 2); // Limit to 2 definitions per part of speech
    limitedDefinitions.forEach((def: any) => {
      wordDetail.definitions.push({
        partOfSpeech: meaning.partOfSpeech,
        definition: def.definition,
        example: def.example || '',
        synonyms: def.synonyms || [],
        antonyms: def.antonyms || [],
      });
    });
  });

  return wordDetail;
}
