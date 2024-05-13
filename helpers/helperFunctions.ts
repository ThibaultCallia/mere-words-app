import exp from 'constants';

interface WordDetail {
  word: string;
  phoneticText: string;
  definitions: Array<{
    partOfSpeech: string;
    definition: string;
  }>;
}

function processDictionaryData(data: any[]): WordDetail | null {
  if (!data || data.length === 0 || data[0].title === 'No Definitions Found') {
    return null;
  }

  const firstEntry = data[0];
  const wordDetail: WordDetail = {
    word: firstEntry.word,
    phoneticText: firstEntry.phonetic || '',
    definitions: [],
  };

  firstEntry.meanings.forEach((meaning: any) => {
    if (wordDetail.definitions.length < 2) {
      const def = meaning.definitions[0];
      wordDetail.definitions.push({
        partOfSpeech: meaning.partOfSpeech,
        definition: def.definition,
      });
    }
  });

  return wordDetail;
}

export { processDictionaryData };
