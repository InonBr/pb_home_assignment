export interface CreateNewUserInterface {
  email: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserInterface extends CreateNewUserInterface {
  balance: number;
  userId: string;
}
