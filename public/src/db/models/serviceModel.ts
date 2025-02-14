import { ObjectId } from "mongodb";
import { database } from "../config/config";

class ServiceModel {
  static collection() {
    return database.collection("services");
  }

  static async findById(kode: string) {
    return this.collection().findOne({ kode: kode });
  }
}

export default ServiceModel;
