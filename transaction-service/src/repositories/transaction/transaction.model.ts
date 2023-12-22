import { UserDataInterface } from "@systems/utils";

export interface ValidateTransactionInterface {
  receiverInfo: UserDataInterface | null;
  payingInfo: UserDataInterface | null;
  amount: number;
}

export interface CreateNewTransactionInterface {
  amount: number;
  fromGroup: boolean;
  toGroup: boolean;
  fromId: string;
  toId: string;
}

