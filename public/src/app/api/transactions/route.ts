import TransactionModel from "@/db/models/transactionModel";

export async function POST(request: Request) {
  try {
    const id = request.headers.get("x-user-id") as string;

    const body = await request.json();
    const { services } = body;
    if (services.length === 0) {
      return Response.json(
        { message: "Please provide services" },
        { status: 400 }
      );
    }

    await TransactionModel.create({ services, id });

    return Response.json({ message: "Hello from the API!" });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
