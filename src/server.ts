import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import log from "./config/logger";
import routes from "./routes";
import { Responser } from "./utilities";

const app: Express = express();
const port: number = process.env.PORT as any;
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));

app.use(cors());

// if (
//   process.env.NODE_ENV === "production" ||
//   process.env.NODE_ENV === "development"
// ) {
//   app.use("/api/v1/", routes);
// } else {
//   app.use("/api/v1/", (req: Request, res: Response) => {
//     return Responser({
//       res: res,
//       status: 500,
//       body: null,
//       message: "Under Maintenance Mode",
//       devMessage: "Server is under Maintenance Mode",
//     });
//   });
// }

app.use("/api/v1/", routes);

async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
}

app.listen(port, () => {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  log.info(`👌[server]: Server is running at http://localhost:${port}`);
});
