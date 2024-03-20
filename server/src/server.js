/* Import Statements */
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/connectDB');
const logger = require('./config/logger');

let server;

/* Starting the server and listening on a specific port. */
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 9191;
    server = app.listen(PORT, () =>
      logger.info(`[Server] - Running on port ${PORT}`)
    );
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });

// Logging error using logge
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(`Error: ${error}`);
  exitHandler();
};

// Handle unhandled promise rejections
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
