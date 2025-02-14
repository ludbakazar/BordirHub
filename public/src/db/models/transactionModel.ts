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
}
export default TransactionModel;
