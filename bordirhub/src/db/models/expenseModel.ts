import { expenseType } from "@/type";
import { database } from "../config/config";

class ExpenseModel {
  static collection() {
    return database.collection("expenses");
  }

  static async create(newExpense: expenseType) {
    return this.collection().insertOne(newExpense);
  }
}

export default ExpenseModel;
