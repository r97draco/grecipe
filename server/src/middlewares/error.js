const logger = require('../config/logger');

/* Error handler */
const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = 'Internal Server Error' } = err;

  res.locals.errorMessage = message;

  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };

  logger.error(err);

  res.status(statusCode).json(response);
};

module.exports = {
  errorHandler,
};
