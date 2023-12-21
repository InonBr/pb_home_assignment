import { TransactionStatusEnum } from "@systems/utils";
import { InferType, mixed, number, object } from "yup";

export const CreateTransactionHistoryBodySchema = object().shape({
  status: mixed<TransactionStatusEnum>()
    .oneOf(Object.values(TransactionStatusEnum))
    .required(),
  amount: number().required(),
});

export type CreateTransactionHistoryBodySchemaType = InferType<
  typeof CreateTransactionHistoryBodySchema
>;
