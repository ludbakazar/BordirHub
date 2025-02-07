export type userType = {
  name: string;
  username: string;
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
