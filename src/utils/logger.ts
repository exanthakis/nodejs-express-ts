import logger from "pino";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false,
  },
  timestamp: logger.stdTimeFunctions.isoTime,
  // timestamp: logger.stdTimeFunctions.isoTime,
});

export default log;
