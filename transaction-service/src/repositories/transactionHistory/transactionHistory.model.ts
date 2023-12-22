import { TransactionStatusEnum } from "@systems/utils";

export interface CreateNewTransactionHistoryInterface {
  amount: number;
  status: TransactionStatusEnum;
  userId: string;
  transactionId: string;
  type: "outcome" | "income";
}

export interface StatusUpdateInterface
  extends Pick<CreateNewTransactionHistoryInterface, "status"> {
  transactionId: string;
}
