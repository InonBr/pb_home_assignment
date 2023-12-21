import { InferType, object, string } from "yup";

export const CreateNewUserSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
});

export type CreateNewUserSchemaType = InferType<typeof CreateNewUserSchema>;
