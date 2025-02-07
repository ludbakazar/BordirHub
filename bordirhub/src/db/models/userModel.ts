import { userType } from "@/type";
import { database } from "../config/config";
import { z } from "zod";
import { hashPass } from "@/helpers/bcrypt";

const userSchema = z.object({
  name: z.string().min(3, { message: "Name is required." }).max(50),
  username: z.string().min(3, { message: "Username is required." }).max(50),
  email: z.string().email({ message: "Email must be a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  role: z.string().min(3, { message: "Role is required." }),
});

class UserModel {
  static collection() {
    return database.collection("users");
  }

  static async create(newUser: userType) {
    if (
      !newUser.name ||
      !newUser.username ||
      !newUser.email ||
      !newUser.password ||
      !newUser.role
    ) {
      throw new Error("All fields are required");
    }

    userSchema.parse(newUser);

    const existingUser = await this.collection().findOne({
      $or: [{ username: newUser.username }, { email: newUser.email }],
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    newUser.password = hashPass(newUser.password);
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();

    return this.collection().insertOne(newUser);
  }

  static async findByEmail(email: string) {
    return this.collection().findOne({ email: email });
  }
}

export default UserModel;
