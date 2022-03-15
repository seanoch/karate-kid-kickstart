import { v4 as uuid } from "uuid";
import { TodoItem } from "../../common/types";

export const aRandomItem = (todo: Partial<TodoItem>) : TodoItem => {
    const {id, text, check} = todo;
    return { 
        id: id ? id : uuid(), 
        text: text ? text : uuid(), 
        check: check ? check : Math.random() < 0.5
    };
}

export const aRandomPartialItem = () : Partial<TodoItem> => {
    const todo: Partial<TodoItem> = { 
        id: uuid(), 
    };

    return todo;
}

export const aUserId = () : string => uuid();