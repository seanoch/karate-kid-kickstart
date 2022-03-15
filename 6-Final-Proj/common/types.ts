export type guid = string;
export type UserID = string;

export interface TodoItem {
    id: guid;
    text: string;
    check: boolean;
  }