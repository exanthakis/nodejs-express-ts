import mongoose from "mongoose";
import config from "../config.ts";
import logger from "./logger.ts";

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
