import {
  GroupDataInterface,
  TransactionStatusEnum,
  UserDataInterface,
} from "@systems/utils";

export interface ValidateTransactionInterface {
  receiverInfo: UserDataInterface | GroupDataInterface | null;
  payingInfo: UserDataInterface | GroupDataInterface | null;
  amount: number;
}

export interface CreateNewTransactionInterface {
  amount: number;
  fromGroup: boolean;
  toGroup: boolean;
  fromId: string;
  toId: string;
}

export interface UpdateTransactionInterface {
  transactionId: string;
  updatedStatus: TransactionStatusEnum;
}
