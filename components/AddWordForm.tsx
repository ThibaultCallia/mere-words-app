'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function AddWordForm(props: any) {
  // State to hold the input value
  const [word, setWord] = useState('');

  // Handler for form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    props.setWordStack([...props.wordStack, word]);
    setWord('');
    // API call or handle the data further
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
        className="border rounded p-2 text-lg"
      />
      <Button type="submit">Look Up</Button>
    </form>
  );
}

export default AddWordForm;
