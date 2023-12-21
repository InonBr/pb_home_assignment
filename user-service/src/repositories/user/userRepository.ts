import UserModel from "@model/User.model";
import { CreateNewUserInterface } from "./userRepository.model";

export const findUserByEmail = async (email: string) =>
  UserModel.findOne({ email });

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

  const { _id } = newUserData;

  return _id;
};
