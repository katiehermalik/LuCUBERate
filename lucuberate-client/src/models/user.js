let url;
let signupUrl;
let loginUrl;
let logoutUrl;

if (process.env.NODE_ENV === "production") {
  url = `https://lucuberate.herokuapp.com/api/v1/users`;
  signupUrl = `https://lucuberate.herokuapp.com/api/signup`;
  loginUrl = `https://lucuberate.herokuapp.com/api/login`;
  logoutUrl = `https://lucuberate.herokuapp.com/api/logout`;
} else {
  url = `http://localhost:4000/api/v1/users`;
  signupUrl = `http://localhost:4000/api/signup`;
  loginUrl = `http://localhost:4000/api/login`;
  logoutUrl = `http://localhost:4000/api/logout`;
}

class UserModel {
  static create(newUser) {
    return fetch(signupUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserModel.create", err);
        return { message: "Error fetching data in UserModel.create" };
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
        console.log("Error fetching data in UserModel.findOne", err);
        return { message: "Error fetching data in UserModel.findOne" };
      });
  }

  static logout() {
    return fetch(logoutUrl, {
      method: "DELETE",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserModel.logout", err);
        return { message: "Error fetching data in UserModel.logout" };
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
        console.log("Error fetching data in UserModel.update", err);
        return { message: "Error fetching data in UserModel.update" };
      });
  }

  static allCubesAndCategories(id) {
    return fetch(`${url}/${id}`, {
      method: "GET",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserModel.allCubes", err);
        return { cubes: [] }; // something back as well as error
      });
  }
}

export default UserModel;
