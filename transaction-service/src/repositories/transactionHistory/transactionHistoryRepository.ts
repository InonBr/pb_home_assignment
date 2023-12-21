import TransactionHistoryModel from "@model/TransactionHistory.model";
import { CreateNewTransactionHistory } from "./transactionHistory.model";

export const createNewTransactionHistory = async ({
  amount,
  status,
  userId,
}: CreateNewTransactionHistory) => {
  const newTransactionData = new TransactionHistoryModel({
    amount,
    status,
    userId,
  });

  await newTransactionData.save();

  return newTransactionData._id;
};
