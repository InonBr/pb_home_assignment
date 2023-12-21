import { TransactionStatusEnum } from "@systems/utils";

export interface CreateNewTransactionHistory {
  amount: number;
  status: TransactionStatusEnum;
  userId: string;
}
