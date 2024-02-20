require('dotenv').config();
const { format, createLogger, transports, addColors } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({ silent: process.env.NODE_ENV === 'test' }),
    new transports.File({ filename: 'src/server.log' }),
  ],
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.padLevels(),
    format.printf((info) =>
      format
        .colorize()
        .colorize(
          info.level,
          `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`
        )
    )
  ),
});

addColors({
  error: 'bold red',
  warn: 'bold yellow',
  info: 'bold cyan',
  debug: 'bold green',
});

module.exports = logger;
