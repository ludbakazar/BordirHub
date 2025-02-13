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

export async function PUT(
  request: Request,
  { params }: { params: { kode: string } }
) {
  try {
    const { kode } = await params;
    const { nama } = await request.json();

    await ServiceModel.update(kode, { nama });

    return Response.json({ message: "Service updated" });
  } catch (error: any) {
    return errorHandler(error);
  }
}
