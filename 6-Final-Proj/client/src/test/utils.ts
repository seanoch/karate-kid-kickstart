import { TodoItem as TodoItemData } from "../../../common/types";
import { Chance } from "chance";

const chance = new Chance();

export const aRandomItem = (todo?: Partial<TodoItemData>) : TodoItemData => {
    const sampleTodo = {id: chance.guid(), text: chance.sentence(), check: chance.bool()};
    return { 
      ...sampleTodo,
      ...todo
    };
};

export const aRandomItemText = () : string => chance.sentence();