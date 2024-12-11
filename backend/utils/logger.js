const winston = require('winston');
const { createLogger, format, transports } = winston;
const DailyRotateFile = require('winston-daily-rotate-file');

// Define formats for logs
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
  )
);

// Success Logger
const successLogger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(), // Logs to console
    new DailyRotateFile({
      filename: './logs/access-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Keep logs for 14 days
      zippedArchive: true, // Compress old logs
    }),
  ],
});

// Error Logger
const errorLogger = createLogger({
  level: 'error',
  format: logFormat,
  transports: [
    new transports.Console(), // Logs to console
    new DailyRotateFile({
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
    }),
  ],
});

module.exports = {
  successLogger,
  errorLogger,
};
