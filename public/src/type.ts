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

export type serviceType = {
  _id: string;
  kode: string;
  nama: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type listTransactionType = {
  _id: string;
  costumerId: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
};
