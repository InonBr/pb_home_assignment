import { objectIdValidator } from "@systems/utils";
import { InferType, number, object, string } from "yup";

export const CreateNewGroupSchema = object().shape({
  groupName: string().required(),
});

export const UpdateGroupSchema = object().shape({
  amount: string().required(),
});

export const UpdateGroupBalanceSchema = object().shape({
  balance: string().required(),
});

export const ValidUserIdParamsSchema = object().shape({
  userId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export const ValidGroupIdParamsSchema = object().shape({
  groupId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export const AddToGroupSchema = object().shape({
  userToAdd: string()
    .test((value) => objectIdValidator(value))
    .required(),
  adminId: string()
    .test((value) => objectIdValidator(value))
    .required(),
});

export type CreateNewGroupSchemaType = InferType<typeof CreateNewGroupSchema>;
export type AddToGroupSchemaType = InferType<typeof AddToGroupSchema>;
export type UpdateGroupSchemaType = InferType<typeof UpdateGroupSchema>;
export type UpdateGroupBalanceSchemaType = InferType<
  typeof UpdateGroupBalanceSchema
>;
export type ValidUserIdParamsSchemaType = InferType<
  typeof ValidUserIdParamsSchema
>;
export type ValidGroupIdParamsSchemaType = InferType<
  typeof ValidGroupIdParamsSchema
>;

export type ValidGroupAndUserIdParamsType = {
  groupId: ValidGroupIdParamsSchemaType["groupId"];
  userId: ValidUserIdParamsSchemaType["userId"];
};
