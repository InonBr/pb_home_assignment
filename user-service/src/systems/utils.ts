import mongoose from "mongoose";
import { InferType, object, string } from "yup";

export enum TransactionStatusEnum {
  WAITING = "waiting",
  DONE = "done",
  CANCELED = "canceled",
}

export const objectIdValidator = (value: string | undefined) =>
  value === undefined || mongoose.Types.ObjectId.isValid(value);
