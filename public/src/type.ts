export type userType = {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type loginType = {
  email?: string;
  password: string;
};

export type transactionType = {
  kode: string;
  qty: number;
};
