import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApiError, ServerError } from '../utils/errorUtils';

/**
 * Global error handling middleware for the API
 */
export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[ERROR] ${err.message}`, err);
  
  // If it's already one of our custom API errors
  if (err instanceof ApiError) {
    res.status(err.code).json(err.toJSON());
    return;
  }
  
  // Otherwise, treat it as a server error
  const serverError = new ServerError(err.message || 'An unexpected error occurred');
  res.status(serverError.code).json(serverError.toJSON());
};
