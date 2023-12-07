import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import DuplicateUserError from './user/error/DuplicateUser';
import InternalError from './error/internal';
import UnauthorizedError from './error/unauthorized';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RequestErrorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error instanceof UnauthorizedError) {
    res.status(401).send({
      message: 'unauthorized',
      cause: error.cause,
    });
    return;
  }

  if (error instanceof InternalError) {
    if (error.error instanceof TokenExpiredError) {
      res.status(401).send({
        message: 'error',
        cause: 'token expired',
      });
      return;
    }

    if (error.error instanceof DuplicateUserError) {
      res.status(400).send({
        message: 'error',
        cause: 'duplicate user',
      });
      return;
    }

    if (error.error instanceof UnauthorizedError) {
      res.status(401).send({
        message: 'unauthorized',
        cause: error.error.cause,
      });
      return;
    }
  }

  res.status(500).send({
    message: 'internal error',
    cause: 'unknown',
  });
};

export default RequestErrorHandler;
