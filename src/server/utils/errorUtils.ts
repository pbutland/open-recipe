/**
 * Base error class for API errors
 */
export class ApiError extends Error {
  code: number;
  type: string;
  details?: Record<string, any>;

  constructor(message: string, code: number, type: string, details?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.type = type;
    this.details = details;
    
    // Maintain proper stack trace in Node.js
    Error.captureStackTrace(this, this.constructor);
  }
  
  toJSON() {
    return {
      code: this.code,
      type: this.type,
      message: this.message,
      ...(this.details && { details: this.details })
    };
  }
}

/**
 * Error used when a requested resource is not found
 */
export class NotFoundError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 404, 'NotFound', details);
  }
}

/**
 * Error used when request data fails validation
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 400, 'ValidationError', details);
  }
}

/**
 * Error used when there's an internal server problem
 */
export class ServerError extends ApiError {
  constructor(message: string = 'An unexpected error occurred', details?: Record<string, any>) {
    super(message, 500, 'ServerError', details);
  }
}
