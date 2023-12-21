import { TransactionStatusEnum } from "@systems/utils";
import { InferType, mixed, number, object, string } from "yup";
import mongoose from "mongoose";

export const CreateTransactionHistoryBodySchema = object().shape({
  status: mixed<TransactionStatusEnum>()
    .oneOf(Object.values(TransactionStatusEnum))
    .required(),
  amount: number().required(),
});

export const CreateTransactionHistoryParamsSchema = object().shape({
  userId: string()
    .test(
      (value) => value === undefined || mongoose.Types.ObjectId.isValid(value)
    )
    .required(),
});

export type CreateTransactionHistoryBodySchemaType = InferType<
  typeof CreateTransactionHistoryBodySchema
>;
export type CreateTransactionHistoryParamsSchemaType = InferType<
  typeof CreateTransactionHistoryParamsSchema
>;
