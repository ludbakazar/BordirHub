import ExpenseModel from "@/db/models/expenseModel";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nama, harga } = body;

    if (!nama || !harga) {
      return new Response("Nama dan harga harus diisi", { status: 400 });
    }
    const newExpense = {
      kode: "E-" + Math.floor(Math.random() * 1000),
      nama: nama.toUpperCase(),
      harga: Number(harga),
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

export async function GET(request: Request) {
  try {
    const data = await ExpenseModel.getAll();

    return Response.json(data);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
