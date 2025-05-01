class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // sistemsel olmayan hata olduğunu belirtiyoruz
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
