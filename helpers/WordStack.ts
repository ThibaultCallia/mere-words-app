class WordStack<T> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  push(element: T): WordStack<T> {
    return new WordStack([...this.items, element]);
  }

  pop(): WordStack<T> {
    if (this.items.length === 0) {
      return new WordStack(); // return new empty stack if current stack is empty
    }
    const newItems = this.items.slice(0, -1);
    return new WordStack(newItems);
  }

  peek(): T | null {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): WordStack<T> {
    return new WordStack();
  }

  toArray(): T[] {
    return [...this.items];
  }

  getAllWords(): string[] {
    return this.items.map((item: any) => item.word);
  }
}

export default WordStack;
