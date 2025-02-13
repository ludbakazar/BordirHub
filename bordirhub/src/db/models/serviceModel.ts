import { z } from "zod";
import { database } from "../config/config";
import { serviceType } from "@/type";

const serviceSchema = z.object({
  name: z.string().min(3, { message: "Name is required." }).max(50),
});

class ServiceModel {
  static collection() {
    return database.collection("services");
  }

  static async create(data: any) {
    const { name } = data;

    serviceSchema.parse(data);

    const newService = {
      kode: "S-" + Math.floor(Math.random() * 1000),
      nama: name.toUpperCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.collection().insertOne(newService);
  }

  static async getAll() {
    return this.collection().find().toArray();
  }

  static async delete(kode: string) {
    return this.collection().deleteOne({ kode });
  }

  static async update(kode: string, data: serviceType) {
    const { nama } = data;

    return this.collection().updateOne(
      { kode },
      { $set: { nama, updatedAt: new Date() } }
    );
  }
}

export default ServiceModel;
