import axios from "axios";
import { AuthHeader } from "./AuthService";

export class ApiClient {
  static baseUrl = ""

  static get(url) {
    return axios.get(`${this.baseUrl}${url}`, { headers: AuthHeader() });
  }

  static post(url, data) {
    return axios.post(`${this.baseUrl}${url}`, data, { headers: AuthHeader() });
  }
}