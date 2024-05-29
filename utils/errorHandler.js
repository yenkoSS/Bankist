class CustomError {
  constructor(statusCode = 400, status, message) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

module.exports = CustomError;
