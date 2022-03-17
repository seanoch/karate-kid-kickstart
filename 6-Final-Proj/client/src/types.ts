import { TodoItem } from "../../common/types";
export interface ITodoItemData extends TodoItem {
  inEditMode: boolean;
}