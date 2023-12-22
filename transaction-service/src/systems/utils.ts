import mongoose from "mongoose";

export enum TransactionStatusEnum {
  WAITING = "waiting",
  DONE = "done",
  CANCELED = "canceled",
}

export interface UserDataInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  creationDate: string;
}

export const objectIdValidator = (value: string | undefined) =>
  value === undefined || mongoose.Types.ObjectId.isValid(value);
