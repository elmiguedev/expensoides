import axios from "axios";
import { ApiClient } from "./ApiClient";

export class ApartmentService {

  static async add(apartment) {
    apartment.buildingId = 1;
    const response = await ApiClient.post("/api/apartments", apartment);
    return response.data;
  }

  static async getAll() {
    const response = await ApiClient.get("/api/apartments");
    return response.data;
  }

}