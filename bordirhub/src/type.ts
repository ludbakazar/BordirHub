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

export type serviceType = {
  kode?: string;
  nama: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type expenseType = {
  kode?: string;
  date: string;
  nama: string;
  harga: number;
  createdAt?: Date;
  updatedAt?: Date;
};
