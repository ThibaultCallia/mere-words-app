class WordStackObj<T> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  push(element: T): WordStackObj<T> {
    return new WordStackObj([...this.items, element]);
  }

  pop(): WordStackObj<T> {
    if (this.items.length === 0) {
      return new WordStackObj(); // return new empty stack if current stack is empty
    }
    const newItems = this.items.slice(0, -1);
    return new WordStackObj(newItems);
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

  clear(): WordStackObj<T> {
    return new WordStackObj();
  }

  toArray(): T[] {
    return [...this.items];
  }

  getAllWords(): string[] {
    return this.items.map((item: any) => item.word);
  }
}

export default WordStackObj;
