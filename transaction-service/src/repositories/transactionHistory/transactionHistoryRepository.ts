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
  TransactionHistoryModel.updateMany(
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
  type,
}: CreateNewTransactionHistoryInterface) => {
  const newTransactionData = new TransactionHistoryModel({
    amount,
    status,
    userId,
    transactionId,
    type,
  });

  await newTransactionData.save();

  return newTransactionData._id;
};
