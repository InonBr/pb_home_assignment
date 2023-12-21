import dotenv from "dotenv";

dotenv.config();

export const port = process.env.TRANSACTIONS_PORT || "5002";
export const connectionString = process.env.TRANSACTIONS_ENV
  ? process.env.TRANSACTIONS_DOCKER_KEY
  : process.env.TRANSACTIONS_MONGO_KEY;
