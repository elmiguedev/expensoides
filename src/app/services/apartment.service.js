import axios from "axios";

export default class ApartmentService {
    static getAll() {
        return axios.get("/apartments");
    }
}