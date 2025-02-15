import TransactionModel from "@/db/models/transactionModel";

export async function POST(request: Request) {
  try {
    const id = request.headers.get("x-user-id") as string;

    const body = await request.json();
    const { services, description } = body;
    if (services.length === 0 || description === "") {
      return Response.json(
        { message: "Please provide services" },
        { status: 400 }
      );
    }

    await TransactionModel.create({ services, description, id });

    return Response.json({ message: "Transaction created" }, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const id = request.headers.get("x-user-id") as string;
    const transactions = await TransactionModel.findByCostumerId(id);
    return Response.json(transactions, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
