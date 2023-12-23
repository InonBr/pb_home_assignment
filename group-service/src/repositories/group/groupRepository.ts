import GroupModel from "@model/Group.model";
import { CreateNewGroupInterface } from "./groupRepository.model";

export const findGroupById = async (id: string) => GroupModel.findById(id);

export const addUserToGroup = async (groupId: string, userId: string) =>
  GroupModel.updateOne({ _id: groupId }, { $addToSet: { usersArr: userId } });

export const isGroupAdmin = async (groupId: string, userId: string) =>
  GroupModel.findOne({
    _id: groupId,
    adminsArr: userId,
  });

export const isPartOfGroup = async (groupId: string, userId: string) =>
  GroupModel.findOne({
    _id: groupId,
    adminsArr: userId,
  });

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
