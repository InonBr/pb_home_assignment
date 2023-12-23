import { GroupDataInterface, UserDataInterface } from "@systems/utils";

export interface CreateNewGroupInterface {
  userId: string;
  groupName: string;
}

export interface IsUserAdminInterface {
  userId: string;
  groupId: string;
}

export interface CreateGroupValidationInterface {
  user: UserDataInterface | null;
  group: GroupDataInterface | null;
}
