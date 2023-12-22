import TransactionHistoryModel from "@model/TransactionHistory.model";
import {
  CreateNewTransactionHistoryInterface,
  StatusUpdateInterface,
} from "./transactionHistory.model";

export const findTransactionHistory = async (transactionId: string) =>
  TransactionHistoryModel.findOne({ transactionId });

export const updateTransactionHistoryByTransactionId = async ({
  status,
  transactionId,
}: StatusUpdateInterface) =>
  TransactionHistoryModel.findOneAndUpdate(
    {
      transactionId,
    },
    { status, lastUpdatedDate: new Date() }
  );

export const createNewTransactionHistory = async ({
  amount,
  status,
  userId,
  transactionId,
}: CreateNewTransactionHistoryInterface) => {
  const newTransactionData = new TransactionHistoryModel({
    amount,
    status,
    userId,
    transactionId,
  });

  await newTransactionData.save();

  return newTransactionData._id;
};
