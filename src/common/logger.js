const { createLogger, format, transports } = require('winston');
const { LOG_PATH } = require('./config');
const fs = require('fs');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [
    new transports.Console(format.colorize(), format.cli()),
    new transports.File({
      filename: path.join(__dirname, `${LOG_PATH}//error.log`),
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      filename: path.join(__dirname, `${LOG_PATH}/info.log`),
      level: 'info',
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, `${LOG_PATH}/exceptions.log`),
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exitOnError: true
});

const logStream = fs.createWriteStream(
  path.join(__dirname, `${LOG_PATH}/access.log`),
  { flags: 'a' }
);

const requestLoggerMiddleware = (req, res, next) => {
  const { url: reqUrl, query: reqQueryParams, body: reqBody } = req;
  logger.info('Request logger middleware', {
    url: reqUrl,
    queryParams: reqQueryParams,
    body: reqBody
  });
  next();
};

module.exports = { requestLoggerMiddleware, logger, logStream };
