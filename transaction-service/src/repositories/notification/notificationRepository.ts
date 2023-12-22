import { notificationServiceUrl } from "@config/index";
import axios from "axios";
import { SendNotificationInterface } from "./notification.model";

export const sendNotification = async ({
  amount,
  name,
  type,
  userEmail,
}: SendNotificationInterface) => {
  await axios.post(
    `${notificationServiceUrl}api/notification/sendNotification`,
    {
      amount,
      name,
      type,
      userEmail,
    }
  );
};
