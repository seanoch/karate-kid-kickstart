import { RequestHandler } from "express";
import { v4 as uuid } from "uuid";

export const userIdMiddleware: RequestHandler = (req, res, next) => {
  let userId = req.cookies?.userId;

  if (!userId) {
    userId = uuid();
    res.cookie("userId", userId);
  }

  req.body.userId = userId;

  next();
};
