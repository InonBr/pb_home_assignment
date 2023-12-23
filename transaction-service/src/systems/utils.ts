import mongoose, { Document, ObjectId } from "mongoose";

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

export interface TransactionDataInterface extends Document {
  fromId: string;
  toId: string;
  toGroup: boolean;
  fromGroup: boolean;
  status: "waiting" | "done" | "canceled";
  amount: number;
  creationDate: Date;
  lastUpdatedDate: Date;
}

export interface GroupDataInterface {
  _id: string;
  adminsArr: Array<string>;
  balance: number;
  creationDate: string;
  groupName: string;
  usersArr: Array<string>;
}

export const objectIdValidator = (value: string | undefined) =>
  value === undefined || mongoose.Types.ObjectId.isValid(value);
