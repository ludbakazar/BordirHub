import ServiceModel from "@/db/models/serviceModel";
import errorHandler from "@/helpers/errorHandler";

export async function DELETE(
  request: Request,
  { params }: { params: { kode: string } }
) {
  try {
    const { kode } = await params;
    await ServiceModel.delete(kode);

    return Response.json({ message: "Service deleted" });
  } catch (error: any) {
    return errorHandler(error);
  }
}
