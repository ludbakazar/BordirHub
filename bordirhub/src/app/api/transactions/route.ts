import TransactionModel from "@/db/models/transactionModel";

export async function GET(request: Request) {
  try {
    const transactions = await TransactionModel.find();
    return Response.json(transactions, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
