import express from "express";
import config from "./config.js";
import cors from "cors";
import { deserializeUser } from "./middleware/deserializeUser.js";
import routes from "./routes/index.js";
import logger from "./utils/logger.js";
import connect from "./utils/connect.js";

const port = config.port;
const app = express();

app.use(cors());
app.use(express.json());
app.use(deserializeUser);

app.get("/healthcheck", (_req, res) => {
  res.sendStatus(200);
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(port, async () => {
  logger.info(`App is running at http:localhost:${port}`);
  await connect();
});
