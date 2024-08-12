class CustomError {
  constructor(statusCode, status, message) {
    this.code = statusCode;
    this.status = status;
    this.message = message;
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

module.exports = CustomError;
