import { objectIdValidator } from "@systems/utils";
import { InferType, number, object, string } from "yup";

export const CreateNewGroupSchema = object().shape({
  groupName: string().required(),
});

export const ValidUserIdParamsSchema = object().shape({
  userId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export type CreateNewGroupSchemaType = InferType<typeof CreateNewGroupSchema>;
export type ValidUserIdParamsSchemaType = InferType<
  typeof ValidUserIdParamsSchema
>;
