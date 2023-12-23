import { GroupDataInterface } from "@systems/utils";

export interface IsPartOfGroupInterface {
  groupId: string;
  userId: string;
}

export interface IsPartOfGroupResponseInterface {
  group: GroupDataInterface;
}
