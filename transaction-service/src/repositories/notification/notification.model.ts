export interface SendNotificationInterface {
  fromId: string;
  toId: string;
  amount: number;
  transactionId: string;
  toGroup: boolean;
  fromGroup: boolean;
}
