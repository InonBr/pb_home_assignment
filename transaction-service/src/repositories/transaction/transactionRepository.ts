import TransactionModel from "@model/Transaction.model";
import {
  CreateNewTransactionInterface,
  UpdateTransactionInterface,
  ValidateTransactionInterface,
} from "./transaction.model";
import {
  TransactionDataInterface,
  TransactionStatusEnum,
} from "@systems/utils";

export const createNewTransaction = async ({
  amount,
  fromGroup,
  fromId,
  toGroup,
  toId,
}: CreateNewTransactionInterface) => {
  const newTransactionData = new TransactionModel({
    amount,
    fromGroup,
    toGroup,
    fromId,
    status: TransactionStatusEnum.WAITING,
    toId,
  });

  await newTransactionData.save();

  return newTransactionData._id;
};

export const updateTransaction = ({
  updatedStatus,
  transactionId,
}: UpdateTransactionInterface) =>
  TransactionModel.updateOne({ _id: transactionId }, { status: updatedStatus });

export const findTransactionById = async (transactionId: string) =>
  TransactionModel.findById(transactionId);

export const validateTransaction = ({
  amount,
  payingInfo,
  receiverInfo,
}: ValidateTransactionInterface) => {
  if (!receiverInfo || !payingInfo) {
    return { statusCode: 404, msg: "user not found" };
  }

  if (payingInfo.balance < amount) {
    return {
      statusCode: 400,
      msg: "amount to pay cannot be grater then the balance",
    };
  }

  return null;
};

export const validateTransactionAcceptance = (
  transaction: TransactionDataInterface | null,
  updatedStatus: TransactionStatusEnum
) => {
  if (!transaction) {
    return { statusCode: 404, msg: "transaction not found" };
  }

  if (updatedStatus === TransactionStatusEnum.WAITING) {
    return {
      statusCode: 400,
      msg: "cannot reopen transactions",
    };
  }

  if (transaction.status !== TransactionStatusEnum.WAITING) {
    return {
      statusCode: 400,
      msg: `transaction was already ${transaction.status}`,
    };
  }

  return null;
};
