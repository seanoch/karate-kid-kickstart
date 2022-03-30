import { Matcher, MatcherOptions } from "@testing-library/react";
import { TodoItem as ServerTodoItem } from "../../common/types";

export interface TodoApi {
  createItemData(item: ServerTodoItem): Promise<void>;
  editItemData(item: ServerTodoItem): Promise<void>;
  removeItemData(id: string): Promise<void>;
  getItems(): Promise<Array<ServerTodoItem>>;
}

export interface RenderApi {
  queryByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement | null;
  getByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement;
  getAllByTestId: (
    id: Matcher,
    options?: MatcherOptions | undefined
  ) => HTMLElement[];
}
