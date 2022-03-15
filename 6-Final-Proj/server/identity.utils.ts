import { Request } from "express";
import { UserID } from "../common/types";

export const getUserId = (req: Request) : UserID => {
    return req.cookies.userId;
}