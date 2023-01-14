let url;
let signupUrl;
let loginUrl;
let logoutUrl;

if (process.env.NODE_ENV === "production") {
  url = `https://lucuberate.com/api/v1/users`;
  signupUrl = `https://lucuberate.com/api/signup`;
  loginUrl = `https://lucuberate.com/api/login`;
  logoutUrl = `https://lucuberate.com/api/logout`;
} else {
  url = `http://localhost:4000/api/v1/users`;
  signupUrl = `http://localhost:4000/api/signup`;
  loginUrl = `http://localhost:4000/api/login`;
  logoutUrl = `http://localhost:4000/api/logout`;
}

class UserAPI {
  static create(newUser) {
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
        console.log("Error fetching data in UserAPI.login", err);
        return { message: "Error fetching data in UserAPI.login" };
      });
  }

  static logout() {
    return fetch(logoutUrl, {
      method: "DELETE",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserAPI.logout", err);
        return { message: "Error fetching data in UserAPI.logout" };
      });
  }

  static update(updatedUserProperties, id) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserProperties),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserAPI.update", err);
        return { message: "Error fetching data in UserAPI.update" };
      });
  }

  static allCubesAndCategories(id) {
    return fetch(`${url}/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserAPI.allCubes", err);
        return { cubes: [] }; // something back as well as error
      });
  }
}

export default UserAPI;
