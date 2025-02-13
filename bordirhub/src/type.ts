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
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
