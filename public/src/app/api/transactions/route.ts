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

    return Response.json({ message: "Transaction created" }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id") as string;
    const transactions = await TransactionModel.findById(id);
    return Response.json(transactions, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
