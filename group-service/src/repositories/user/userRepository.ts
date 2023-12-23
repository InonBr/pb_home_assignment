import { userServiceUrl } from "@config/index";
import { UserObjDataInterface } from "./userRepository.model";
import axios, { AxiosResponse } from "axios";

export const getUserById = async (userId: string) => {
  const { data } = (await axios.get(
    `${userServiceUrl}api/user/getUser/${userId}`
  )) as AxiosResponse<UserObjDataInterface>;

  return data.user;
};
