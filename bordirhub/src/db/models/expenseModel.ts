import { expenseType } from "@/type";
import { database } from "../config/config";

class ExpenseModel {
  static collection() {
    return database.collection("expenses");
  }

  static async create(newExpense: expenseType) {
    return this.collection().insertOne(newExpense);
  }

  static async getAll() {
    // Mendapatkan tanggal saat ini
    const now = new Date();

    // Mengatur tanggal awal bulan berjalan
    const startDate = new Date(now.getFullYear(), now.getMonth(), 2); // 1st day of the current month

    // Mengatur tanggal akhir bulan berjalan (awal bulan berikutnya)
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // 1st day of the next month

    // Menggunakan rentang tanggal untuk query
    return this.collection()
      .find({
        createdAt: {
          $gte: startDate, // Tanggal mulai
          $lt: endDate, // Tanggal akhir (awal bulan berikutnya)
        },
      })
      .sort({ createdAt: -1 })
      .toArray();
  }
}

export default ExpenseModel;
