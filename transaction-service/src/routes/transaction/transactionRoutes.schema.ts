import { TransactionStatusEnum, objectIdValidator } from "@systems/utils";
import { InferType, boolean, mixed, number, object, string } from "yup";

export const CreateTransactionHistoryBodySchema = object().shape({
  amount: number().required(),
  toGroup: boolean().required(),
  fromGroup: boolean().required(),
  fromId: string()
    .test((value) => objectIdValidator(value))
    .required(),
  toId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export type CreateTransactionHistoryBodySchemaType = InferType<
  typeof CreateTransactionHistoryBodySchema
>;
