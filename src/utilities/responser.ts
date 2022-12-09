import { Response } from "express";
import moment from "moment";
import chalk from "chalk";
import logger from "../config/logger";

interface IResponser {
  res: Response;
  status: any;
  body?: any;
  message: string;
  devMessage: any;
}

const current = moment().format("YYYY/MMMM/DD hh:mm:ss A");

const Responser = ({ res, status, body, message, devMessage }): IResponser => {
  var success: boolean, log: string, dataBody: any;

  if (status >= 200 && status <= 300) {
    success = true;
    log =
      chalk.bgGreen.white("[ SUCCESS ]") +
      chalk.green(`${devMessage}\n${message}\nTime: ${current}`);

    if (body && body !== null) {
      dataBody = body;
    } else {
      dataBody = null;
    }
  } else if (status >= 400 && status < 500) {
    success = false;
    log =
      chalk.bgYellow.white("[ CLIENT ERROR ]") +
      chalk.yellow(`${devMessage}\n${message}\nTime: ${current}`);

    if (body && body !== null) {
      dataBody = body;
    } else {
      dataBody = null;
    }
  } else {
    success = false;
    log =
      chalk.bgRed.white("[ SERVER ERROR ]") +
      chalk.red(`${devMessage}\n${message}\nTime: ${current}`);

    dataBody = null;
  }

  var dataModel = {
    meta: {
      success: success,
      message: message,
      devMessage: devMessage,
    },
    body: dataBody,
  };

  logger.info(`${log}`);
  return res.status(status).json(dataModel);
};

export default Responser;
