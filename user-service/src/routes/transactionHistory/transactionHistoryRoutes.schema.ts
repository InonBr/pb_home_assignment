import { TransactionStatusEnum } from "@systems/utils";
import { InferType, mixed, number, object, string } from "yup";

export const CreateTransactionHistoryBodySchema = object().shape({
  status: mixed<TransactionStatusEnum>()
    .oneOf(Object.values(TransactionStatusEnum))
    .required(),
  amount: number().required(),
});

export const CreateTransactionHistoryParamsSchema = object().shape({
  userId: string().required(),
});

export type CreateTransactionHistoryBodySchemaType = InferType<
  typeof CreateTransactionHistoryBodySchema
>;
export type CreateTransactionHistoryParamsSchemaType = InferType<
  typeof CreateTransactionHistoryParamsSchema
>;
