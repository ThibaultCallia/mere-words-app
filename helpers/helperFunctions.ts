import { WordDetailInterface } from './interfaces';

export function processDictionaryData(data: any): WordDetailInterface | string {
  if (Array.isArray(data)) {
    if (data.length === 0 || data[0].title) {
      return 'No Definitions Found';
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
  } else if (data.title) {
    return data.title;
  } else {
    return 'No Definitions Found';
  }
}
