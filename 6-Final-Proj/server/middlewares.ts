import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { guid } from "../common/types"

export const userIdMiddleware: RequestHandler = (req, res, next) => {
  let userId: guid = req.cookies?.userId;

  if (!userId) {
    userId = uuid();
    res.cookie("userId", userId);
  }

  req.cookies.userId = userId;

  next();
};
