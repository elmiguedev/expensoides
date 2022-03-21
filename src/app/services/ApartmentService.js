import axios from "axios";

export class ApartmentService {
  constructor() {
  }

  static async add(apartment) {
    console.log("LO QUE VIENE", apartment)
    apartment.buildingId = 1;
    const response = await axios.post("/api/apartments", apartment);
    return response.data;
  }

  static async getAll() {
    const response = await axios.get("/api/apartments");
    return response.data;
  }

}