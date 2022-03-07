import {Request, Response, NextFunction} from 'express';
import { v4 as uuid } from 'uuid';

export const userIdMiddleware = (req: Request, res: Response, next: NextFunction) : void => {
  let userId = req.cookies?.userId;
  
  if (!userId) {
    userId = uuid();
    res.cookie("userId", userId);
  }
  
  req.body.userId = userId;

  next();
};