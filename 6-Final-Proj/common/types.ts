export type guid = string;

export interface TodoItem {
    id: guid;
    text: string;
    check: boolean;
  }