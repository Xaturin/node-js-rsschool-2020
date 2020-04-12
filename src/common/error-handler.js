const { logger } = require('./logger');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');

class ErrorHandler extends Error {
  constructor(statusCode, message, data) {
    super();
    this.statusCode = statusCode || BAD_REQUEST;
    this.message = message;
    this.data = data;
  }
}

const handleError = (req, res) => {
  const { statusCode = BAD_REQUEST, message, data } = req;
  logger.error(getStatusText(statusCode), req);
  res.status(statusCode).json({
    statusCode,
    message,
    errors: data
  });
};

const handleInternalError = (req, res) => {
  const status = INTERNAL_SERVER_ERROR;
  logger.error(getStatusText(status), req);
  res.status(status).send(getStatusText(status));
};

module.exports = {
  ErrorHandler,
  handleError,
  handleInternalError
};
