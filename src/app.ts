import express from "express";
import config from "config";
import connect from "./utils/connect.js";
import logger from "./utils/logger.js";
import routes from "routes.js";

const port = config.get<number>("port");
const app = express();

app.listen(port, async () => {
  logger.info(`App is running at http:localhost:${port}`);

  await connect();

  routes(app);
});
