import UserModel from "@model/User.model";
import {
  CreateNewUserInterface,
  UpdateUserInterface,
} from "./userRepository.model";

export const findUserByEmail = async (email: string) =>
  UserModel.findOne({ email });

export const findUserById = async (id: string) => UserModel.findById(id);

export const createNewUser = async ({
  email,
  firstName,
  lastName,
}: CreateNewUserInterface) => {
  const newUserData = new UserModel({
    email,
    firstName,
    lastName,
  });

  await newUserData.save();

  return newUserData._id;
};

export const updateUserData = async ({
  balance,
  email,
  firstName,
  lastName,
  userId,
}: UpdateUserInterface) =>
  UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { balance, email, firstName, lastName }
  );
