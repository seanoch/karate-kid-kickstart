export interface BaseTodoItem {
    id: string;
    text: string;
    check: boolean;
  }
export interface TodoItem extends BaseTodoItem {
    userId: string;
  }