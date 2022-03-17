import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { UserID } from "../common/types"

export const userIdMiddleware: RequestHandler = (req, res, next) => {
  let userId: UserID = req.cookies?.userId;

  if (!userId) {
    userId = uuid();
    res.cookie("userId", userId);
  }

  req.cookies.userId = userId;

  next();
};
