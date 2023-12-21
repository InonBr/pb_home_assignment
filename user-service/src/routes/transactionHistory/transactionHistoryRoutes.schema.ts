import { TransactionStatusEnum, objectIdValidator } from "@systems/utils";
import { InferType, mixed, number, object, string } from "yup";

export const CreateTransactionHistoryBodySchema = object().shape({
  status: mixed<TransactionStatusEnum>()
    .oneOf(Object.values(TransactionStatusEnum))
    .required(),
  amount: number().required(),
});

export const UpdateTransactionHistoryBodySchema = object().shape({
  status: mixed<TransactionStatusEnum>()
    .oneOf(Object.values(TransactionStatusEnum))
    .required(),
  amount: number().required(),
});

export const CreateTransactionHistoryParamsSchema = object().shape({
  userId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export const UpdateTransactionHistoryParamsSchema = object().shape({
  transactionId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export type CreateTransactionHistoryBodySchemaType = InferType<
  typeof CreateTransactionHistoryBodySchema
>;

export type CreateTransactionHistoryParamsSchemaType = InferType<
  typeof CreateTransactionHistoryParamsSchema
>;

export type UpdateTransactionHistoryParamsSchemaType = InferType<
  typeof UpdateTransactionHistoryParamsSchema
>;
