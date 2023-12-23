import dotenv from "dotenv";

dotenv.config();

export const port = process.env.GROUP_PORT || "5004";
export const userServiceUrl = process.env.GROUP_ENV
  ? process.env.USER_SERVICE_DOCKER_URL
  : process.env.USER_SERVICE_URL;
export const connectionString = process.env.GROUP_ENV
  ? process.env.GROUP_DOCKER_KEY
  : process.env.GROUP_MONGO_KEY;

const mandatoryVarArr = [
  {
    value: connectionString,
    envName: "GROUP_DOCKER_KEY || GROUP_MONGO_KEY",
  },
  {
    value: userServiceUrl,
    envName: "USER_SERVICE_DOCKER_URL || USER_SERVICE_URL",
  },
];

mandatoryVarArr.map(({ envName, value }) => {
  if (!value) {
    console.error(`🔴 environment variable :: ${envName} was not provided`);
    process.exit(1);
  }
});
