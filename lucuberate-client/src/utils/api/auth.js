import { loginUrl, logoutUrl, signupUrl } from "../../config/multi-environment";

class AuthAPI {
  static signup(newUser) {
    return fetch(signupUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in AuthAPI.signup", err);
        return { message: "Error fetching data in AuthAPI.signup" };
      });
  }

  static login(user) {
    return fetch(loginUrl, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in AuthAPI.login", err);
        return { message: "Error fetching data in AuthAPI.login" };
      });
  }

  static logout() {
    return fetch(logoutUrl, {
      method: "DELETE",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in AuthAPI.logout", err);
        return { message: "Error fetching data in AuthAPI.logout" };
      });
  }
}

export default AuthAPI;
