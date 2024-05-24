'use client';

import { ColumnDef } from '@tanstack/react-table';
import { WordDetailInterface } from '@/helpers/interfaces';
import { formatDate, capitalise } from '@/helpers/helperFunctions';

export const columns: ColumnDef<WordDetailInterface>[] = [
  {
    accessorKey: 'word',
    header: 'Word',
    cell: ({ row }) => {
      const word = capitalise(row.original.word);
      return <span>{word}</span>;
    },
  },
  {
    accessorKey: 'phonetic_text',
    header: 'Phonetic',
    cell: ({ row }) => {
      const phonetic = row.original.phonetic_text ?? '';
      return <span className="italic">{phonetic}</span>;
    },
  },
  {
    accessorKey: 'definition',
    header: 'Definition',
    cell: ({ row }) => {
      const definition = row.original.definition ?? [];
      return <span>{definition[0]?.definition}</span>;
    },
  },
  {
    accessorKey: 'date_added',
    header: 'Date Added',
    cell: ({ row }) => {
      const dateAdded = row.original.date_added ?? '';
      return <span>{formatDate(dateAdded)}</span>;
    },
  },
];
