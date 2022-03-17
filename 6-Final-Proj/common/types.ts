export type guid = string;
export type UserID = guid;

export interface TodoItem {
    id: guid;
    text: string;
    check: boolean;
  }