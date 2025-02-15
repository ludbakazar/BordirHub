import { transactionType } from "@/type";
import { client, database } from "../config/config";
import { ObjectId } from "mongodb";
import ServiceModel from "./serviceModel";

class TransactionModel {
  static transaction() {
    return database.collection("transactions");
  }

  static detailTransaction() {
    return database.collection("detailTransactions");
  }

  static async create({
    services,

    id,
  }: {
    services: transactionType[];

    id: string;
  }) {
    await client.connect();
    const session = client.startSession();
    try {
      session.startTransaction();
      const newTransaction = {
        costumerId: new ObjectId(id),
        status: "pending",
        totalAmount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const transaction = await this.transaction().insertOne(newTransaction, {
        session,
      });

      for (const service of services) {
        const serviceData = await ServiceModel.findById(service.kode);
        if (!serviceData) {
          throw new Error("Service not found");
        }

        const newDetailTransaction = {
          transactionId: transaction.insertedId,
          serviceId: serviceData._id,
          qty: service.qty,
          price: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await this.detailTransaction().insertOne(newDetailTransaction, {
          session,
        });
      }
      return await session.commitTransaction();
    } catch (error: any) {
      await session.abortTransaction();
      throw new Error(error.message);
    } finally {
      session.endSession();
    }
  }

  static async findByCostumerId(id: string) {
    const agg = [
      {
        $match: {
          costumerId: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "detailTransactions",
          localField: "_id",
          foreignField: "transactionId",
          as: "detailTransactions",
        },
      },
      {
        $unwind: {
          path: "$detailTransactions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "detailTransactions.serviceId",
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
          Id: 1,
          costumerId: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          totalAmount: 1,
          "detailTransactions.qty": 1,
          "detailTransactions.price": 1,
          "service.nama": 1,
        },
      },
    ];

    return await this.transaction().aggregate(agg).toArray();
  }

  static async findById(id: string) {
    const agg = [
      {
        $match: {
          costumerId: new ObjectId(id),
        },
      },
    ];

    return await this.transaction().aggregate(agg).toArray();
  }
}
export default TransactionModel;
