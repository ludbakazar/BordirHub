import ServiceModel from "@/db/models/serviceModel";

export async function GET(request: Request) {
  try {
    const services = await ServiceModel.getAll();
    if (!services) {
      return Response.json({ error: "Services not found" }, { status: 404 });
    }
    return Response.json(services);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
