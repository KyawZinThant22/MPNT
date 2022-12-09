import pino from "pino";
import pretty from "pino-pretty";
import moment from "moment";

const stream = pretty({
  colorize: true,
  ignore: "pid",
  customPrettifiers: {
    time: (timestamp) => `${moment().format(" D/M/Y,h:mm:ss a")} ⏱️ `,
  },
});

const logger = pino(stream);
export default logger;
