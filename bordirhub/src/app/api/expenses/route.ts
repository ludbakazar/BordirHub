import ExpenseModel from "@/db/models/expenseModel";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, nama, harga } = body;
    if (!date || !nama || !harga) {
      return new Response("Nama dan harga harus diisi", { status: 400 });
    }
    const newExpense = {
      kode: "E-" + Math.floor(Math.random() * 1000),
      date: date,
      nama: nama.toUpperCase(),
      harga: harga,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await ExpenseModel.create(newExpense);

    return Response.json(
      { message: "Berhasil menambahkan data" },
      { status: 201 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
