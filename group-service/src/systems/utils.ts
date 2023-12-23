import mongoose, { Document } from "mongoose";

export const objectIdValidator = (value: string | undefined) =>
  value === undefined || mongoose.Types.ObjectId.isValid(value);

export interface UserDataInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  creationDate: string;
}

export interface GroupDataInterface extends Document {
  groupName: string;
  usersArr: Array<string>;
  adminsArr: Array<string>;
  balance: number;
  creationDate: Date;
}
