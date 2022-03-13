import { v4 as uuid } from "uuid";
import { TodoItem } from "../../common/types";

export const getRandomItem = () : TodoItem => {
    const todo: TodoItem = { 
        id: uuid(), 
        text: "hi", 
        check: true
    };

    return todo;
}

export const getRandomPartialItem = () : Partial<TodoItem> => {
    const todo: Partial<TodoItem> = { 
        id: uuid(), 
        check: true
    };

    return todo;
}

export const getRandomUserId = () : string => uuid();