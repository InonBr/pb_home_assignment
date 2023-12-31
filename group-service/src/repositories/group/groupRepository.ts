import GroupModel from "@model/Group.model";
import {
  CreateGroupValidationInterface,
  CreateNewGroupInterface,
} from "./groupRepository.model";

export const findGroupById = async (id: string) => GroupModel.findById(id);

export const findGroupByName = async (groupName: string) =>
  GroupModel.findOne({ groupName });

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

export const updateGroup = async (groupId: string, balance: string) =>
  GroupModel.findOneAndUpdate(
    {
      _id: groupId,
    },
    { balance }
  );

export const validateCreateUser = ({
  group,
  user,
}: CreateGroupValidationInterface) => {
  if (!user) {
    return { msg: "user not found", status: 404 };
  }

  if (group) {
    return { msg: "group name is already taken", status: 400 };
  }

  return null;
};
