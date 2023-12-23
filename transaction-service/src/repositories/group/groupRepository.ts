import { groupServiceUrl } from "@config/index";
import axios, { AxiosResponse } from "axios";
import {
  IsPartOfGroupInterface,
  IsPartOfGroupResponseInterface,
} from "./group.schema";

export const isUserPartOfGroup = async ({
  groupId,
  userId,
}: IsPartOfGroupInterface) => {
  const { data } = (await axios.get(
    `${groupServiceUrl}api/group/isPartOfGroup/${groupId}/${userId}`
  )) as AxiosResponse<IsPartOfGroupResponseInterface>;

  return data.group;
};
