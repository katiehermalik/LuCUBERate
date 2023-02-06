let url;

if (process.env.NODE_ENV === "production") {
  url = `https://lucuberate.com/api/v1/users`;
} else {
  url = `http://localhost:4000/api/v1/users`;
}

class UserAPI {
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
        return { cubes: [] };
      });
  }
}

export default UserAPI;
