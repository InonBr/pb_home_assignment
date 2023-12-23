import { notificationServiceUrl } from "@config/index";
import axios from "axios";
import { SendNotificationInterface } from "./notification.model";

export const sendNotification = async ({
  amount,
  fromGroup,
  fromId,
  toGroup,
  toId,
  transactionId,
}: SendNotificationInterface) => {
  await axios.post(
    `${notificationServiceUrl}api/notification/sendNotification`,
    {
      amount,
      fromGroup,
      fromId,
      toGroup,
      toId,
      transactionId,
    }
  );
};
