import UserModel from "@/db/models/userModel";
import errorHandler from "@/helpers/errorHandler";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await UserModel.create(data);
    return Response.json({ message: "user created" }, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
