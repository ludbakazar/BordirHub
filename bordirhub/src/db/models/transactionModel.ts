import path from "path";
import { database } from "../config/config";

class TransactionModel {
  static collection() {
    return database.collection("transactions");
  }

  static async find() {
    const agg = [
      {
        $lookup: {
          from: "users",
          localField: "costumerId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "detailTransactions",
          localField: "_id",
          foreignField: "transactionId",
          as: "detail",
        },
      },
      {
        $unwind: {
          path: "$detail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "detail.serviceId",
          foreignField: "_id",
          as: "service",
        },
      },
      {
        $unwind: {
          path: "$service",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          "user.name": 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          "detail.qty": 1,
          "detail.price": 1,
          "service.nama": 1,
          totalAmount: 1,
        },
      },
    ];
    return this.collection().aggregate(agg).toArray();
  }
}
export default TransactionModel;
