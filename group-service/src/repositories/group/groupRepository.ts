import GroupModel from "@model/Group.model";
import { CreateNewGroupInterface } from "./groupRepository.model";

export const findGroupById = async (id: string) => GroupModel.findById(id);

export const createNewGroup = async ({
  groupName,
  userId,
}: CreateNewGroupInterface) => {
  const newGroupData = new GroupModel({
    groupName,
    userId,
    usersArr: [userId],
    adminsArr: [userId],
  });

  await newGroupData.save();

  return newGroupData._id;
};
