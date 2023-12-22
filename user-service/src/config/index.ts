import dotenv from "dotenv";

dotenv.config();

export const port = process.env.USERS_PORT || "5001";
export const connectionString = process.env.USER_ENV
  ? process.env.USERS_DOCKER_KEY
  : process.env.USERS_MONGO_KEY;

const mandatoryVarArr = [
  {
    value: connectionString,
    envName: "USERS_DOCKER_KEY || USERS_MONGO_KEY",
  },
];

mandatoryVarArr.map(({ envName, value }) => {
  if (!value) {
    console.error(`🔴 environment variable :: ${envName} was not provided`);
    process.exit(1);
  }
});
