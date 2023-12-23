import { TransactionStatusEnum, objectIdValidator } from "@systems/utils";
import { InferType, boolean, mixed, number, object, string } from "yup";

export const CreateTransactionHistoryBodySchema = object().shape({
  amount: number().min(1).required(),
  toGroup: boolean().required(),
  fromGroup: boolean().required(),
  fromId: string()
    .test((value) => objectIdValidator(value))
    .required(),
  toId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export const AcceptTransactionBodySchema = object().shape({
  updatedStatus: mixed<TransactionStatusEnum>()
    .oneOf(Object.values(TransactionStatusEnum))
    .required(),
});

export const AcceptTransactionParamsSchema = object().shape({
  transactionId: string()
    .test((value) => objectIdValidator(value))
    .required(),
  currentUser: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export const CurrentUserParamsSchema = object().shape({
  currentUser: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export type CurrentUserParamsSchemaType = InferType<
  typeof CurrentUserParamsSchema
>;
export type CreateTransactionHistoryBodySchemaType = InferType<
  typeof CreateTransactionHistoryBodySchema
>;
export type AcceptTransactionBodySchemaType = InferType<
  typeof AcceptTransactionBodySchema
>;
export type AcceptTransactionParamsSchemaType = InferType<
  typeof AcceptTransactionParamsSchema
>;
