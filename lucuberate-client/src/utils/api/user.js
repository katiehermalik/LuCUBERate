let url;

if (process.env.NODE_ENV === "production") {
  url = `https://lucuberate.com/api/v1/users/currentuser`;
} else {
  url = `http://localhost:4000/api/v1/users/currentuser`;
}

class UserAPI {
  static userData() {
    return fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserAPI.userData", err);
        return { message: "Error fetching data in UserAPI.userData" };
      });
  }

  static update(updatedUserProperties) {
    return fetch(`${url}/update`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserProperties),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in UserAPI.update", err);
        return { message: "Error fetching data in UserAPI.update" };
      });
  }
}

export default UserAPI;
