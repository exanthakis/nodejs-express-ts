import mongoose from "mongoose";
import config from "../config.js";
import logger from "./logger.js";

const connect = async () => {
  const dbUri = config.dbUri;

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
};

export default connect;
