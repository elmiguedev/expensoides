import axios from "axios";

export class AuthService {

  static login(username, password) {
    console.log("el login", username, password)
    return axios
      .post("/api/login", {
        username: username,
        password: password
      })
      .then(response => {
        console.log("la response", response)
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch(err => {
        console.log("el error", err);
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
  console.log("el token", user);
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}