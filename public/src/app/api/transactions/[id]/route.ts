import TransactionModel from "@/db/models/transactionModel";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const transaction = await TransactionModel.detailById(id);
    if (!transaction) {
      return Response.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    return Response.json(transaction, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
