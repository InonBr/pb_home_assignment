export interface SendNotificationInterface {
  userEmail: string;
  name: string;
  amount: number;
  type: "outcome" | "income";
}
