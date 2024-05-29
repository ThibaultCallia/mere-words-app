'use client';

import { ColumnDef } from '@tanstack/react-table';
import { WordDetailInterface } from '@/helpers/interfaces';
import { formatDate, capitalise } from '@/helpers/helperFunctions';
import { Button } from './ui/button';
import { ArrowUpDown, Delete, Loader2 } from 'lucide-react';

const handleDelete = async (id: any) => {
  console.log('Delete', id);

  try {
    const result = await fetch('...');
  } catch (error) {
    console.log(error);
  }
};

export const columns: ColumnDef<WordDetailInterface>[] = [
  {
    accessorKey: 'word',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-0"
        >
          Word
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-0"
        >
          Date Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateAdded = row.original.date_added ?? '';
      return <span>{formatDate(dateAdded)}</span>;
    },
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      return (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(row.original.id)}
        >
          <Delete className="h-4 w-4" />
        </Button>
      );
    },
  },
];
