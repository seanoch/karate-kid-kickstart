import { Chance } from "chance";
import { TodoItem } from "../../common/types";

const chance = new Chance();

export const aRandomItem = (todo?: Partial<TodoItem>) : TodoItem => {
    const sampleTodo = {id: chance.guid(), text: chance.sentence(), check: chance.bool()};
    return { 
      ...sampleTodo,
      ...todo
    };
}

export const aUserId = () : string => chance.guid();