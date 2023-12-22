import { userServiceUrl } from "@config/index";
import { UserObjDataInterface } from "./user.schema";
import axios, { AxiosResponse } from "axios";

export const getUserById = async (userId: string) => {
  const { data } = (await axios.get(
    `${userServiceUrl}api/user/getUser/${userId}`
  )) as AxiosResponse<UserObjDataInterface>;

  return data.user;
};

export const updateUserBalance = async (userId: string, amount: number) => {
  const { data } = (await axios.put(
    `${userServiceUrl}api/user/updateUser/${userId}`,
    {
      amount,
    }
  )) as AxiosResponse<{ id: string }>;

  return data.id;
};
