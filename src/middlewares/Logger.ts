import winston from 'winston';

const options = {
  rotate: {
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD_HH',
    maxSize: '1m',
    maxFiles: '14d',
  },
  file: {
    level: 'info',
    filename: 'app.log',
    dirname: `./logs/`,
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  },
  error: {
    level: 'error',
    filename: 'app.log',
    dirname: `./logs/`,
    handleExceptions: true,
    json: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  },
  console: {
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
    prettyPrint: true,
    colorize: process.stdout.isTTY,
  },
};

const Logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.error),
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

const logger = {
  log: (message: string): winston.Logger => Logger.info(message),
  info: (message: string, obj?: object): winston.Logger => Logger.info(message, obj),
  error: (message: string, obj?: object): winston.Logger => Logger.error(message, obj),
  warn: (message: string, obj?: object): winston.Logger => Logger.warn(message, obj),
  debug: (message: string, obj?: object): winston.Logger => Logger.debug(message, obj),
  silly: (message: string, obj?: object): winston.Logger => Logger.silly(message, obj),
}
export default logger;
