import { objectIdValidator } from "@systems/utils";
import { InferType, number, object, string } from "yup";

export const CreateNewUserSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
});

export const UpdateUserSchema = object().shape({
  newFirstName: string().optional(),
  newLastName: string().optional(),
  newEmail: string().email().optional(),
  amount: number().optional(),
});

export const ValidUserIdParamsSchema = object().shape({
  userId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export const UpdateUserBalance = object().shape({
  balance: number().min(1).required(),
});

export type ValidUserIdParamsSchemaType = InferType<
  typeof ValidUserIdParamsSchema
>;

export type CreateNewUserSchemaType = InferType<typeof CreateNewUserSchema>;
export type UpdateUserSchemaType = InferType<typeof UpdateUserSchema>;
export type UpdateUserBalanceType = InferType<typeof UpdateUserBalance>;
