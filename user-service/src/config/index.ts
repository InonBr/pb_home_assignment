import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || "5001";
export const connectionString = process.env.NODE_USER_ENV
  ? process.env.USERS_DOCKER_KEY
  : process.env.USERS_MONGO_KEY;
