let loginUrl;
let logoutUrl;
let signupUrl;

if (process.env.NODE_ENV === "production") {
  loginUrl = `https://lucuberate.com/api/v1/auth/login`;
  logoutUrl = `https://lucuberate.com/api/v1/auth/logout`;
  signupUrl = `https://lucuberate.com/api/v1/auth/signup`;
} else {
  loginUrl = `http://localhost:4000/api/v1/auth/login`;
  logoutUrl = `http://localhost:4000/api/v1/auth/logout`;
  signupUrl = `http://localhost:4000/api/v1/auth/signup`;
}

class AuthAPI {
  static signup(newUser) {
    return fetch(signupUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserAPI.create", err);
        return { message: "Error fetching data in UserAPI.create" };
      });
  }

  static login(user) {
    return fetch(loginUrl, {
      method: "POST",
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
