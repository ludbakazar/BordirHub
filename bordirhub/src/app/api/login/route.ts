import UserModel from "@/db/models/userModel";
import { comparePass } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json(
      {
        message: "Email and password are required",
      },
      {
        status: 400,
      }
    );
  }

  const user = await UserModel.findByEmail(email);

  if (!user) {
    return Response.json(
      {
        message: "Invalid email or password",
      },
      {
        status: 400,
      }
    );
  }

  if (!comparePass(password, user.password)) {
    return Response.json(
      {
        message: "Invalid email or password",
      },
      {
        status: 400,
      }
    );
  }

  const access_token = signToken({
    _id: user._id.toString(),
    email: user.email,
  });

  const cookieStore = await cookies();
  cookieStore.set("authorization", `Bearer ${access_token}`);

  return Response.json(
    {
      message: "Login successful",
      access_token,
    },
    {
      status: 200,
    }
  );
}
