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

export type CreateNewUserSchemaType = InferType<typeof CreateNewUserSchema>;
export type UpdateUserSchemaType = InferType<typeof UpdateUserSchema>;
