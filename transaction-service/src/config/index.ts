import dotenv from "dotenv";

dotenv.config();

export const port = process.env.TRANSACTIONS_PORT || "5002";
export const userServiceUrl = process.env.TRANSACTIONS_ENV
  ? process.env.USER_SERVICE_DOCKER_URL
  : process.env.USER_SERVICE_URL;
export const notificationServiceUrl = process.env.TRANSACTIONS_ENV
  ? process.env.NOTIFICATION_SERVICE_DOCKER_URL
  : process.env.NOTIFICATION_SERVICE_URL;
export const connectionString = process.env.TRANSACTIONS_ENV
  ? process.env.TRANSACTIONS_DOCKER_KEY
  : process.env.TRANSACTIONS_MONGO_KEY;

const mandatoryVarArr = [
  {
    value: userServiceUrl,
    envName: "USER_SERVICE_DOCKER_URL || USER_SERVICE_URL",
  },
  {
    value: connectionString,
    envName: "TRANSACTIONS_DOCKER_KEY || TRANSACTIONS_MONGO_KEY",
  },
  {
    value: notificationServiceUrl,
    envName: "NOTIFICATION_SERVICE_DOCKER_URL || NOTIFICATION_SERVICE_URL",
  },
];

mandatoryVarArr.map(({ envName, value }) => {
  if (!value) {
    console.error(`🔴 environment variable :: ${envName} was not provided`);
    process.exit(1);
  }
});
