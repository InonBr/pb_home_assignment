import UserModel from "@model/User.model";
import { CreateNewUserInterface } from "./userRepository.model";

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
