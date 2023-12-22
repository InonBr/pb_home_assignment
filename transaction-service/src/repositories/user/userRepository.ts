import { userServiceUrl } from "@config/index";
import { UserDataInterface } from "./user.schema";
import axios, { AxiosResponse } from "axios";

export const getUserById = async (userId: string) => {
  const { data } = (await axios.get(
    `${userServiceUrl}api/user/getUser/${userId}`
  )) as AxiosResponse<UserDataInterface>;

  return data.user;
};
