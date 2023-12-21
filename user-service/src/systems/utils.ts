import mongoose from "mongoose";
import { InferType, object, string } from "yup";

export enum TransactionStatusEnum {
  WAITING = "waiting",
  DONE = "done",
  CANCELED = "canceled",
}

export const CreateTransactionHistoryParamsSchema = object().shape({
  userId: string()
    .test(
      (value) => value === undefined || mongoose.Types.ObjectId.isValid(value)
    )
    .required(),
});

export type CreateTransactionHistoryParamsSchemaType = InferType<
  typeof CreateTransactionHistoryParamsSchema
>;
