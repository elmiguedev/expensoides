import axios from "axios";

export class ApartmentService {
  constructor() {
  }

  static async getAll() {
    const response = await axios.get("/api/apartments");
    return response.data;
  }

}