import axios from "axios";

export class AuthService {

  static login(username, password) {
    return axios
      .post("/api/login", {
        username: username,
        password: password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  static logout() {
    localStorage.removeItem("user");
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

}

export function AuthHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}