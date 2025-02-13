import ServiceModel from "@/db/models/serviceModel";
import errorHandler from "@/helpers/errorHandler";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    await ServiceModel.create(data);

    return Response.json({ message: "Service created" }, { status: 201 });
  } catch (error: any) {
    return errorHandler(error);
  }
}
