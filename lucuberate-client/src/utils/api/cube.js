let url;
if (process.env.NODE_ENV === "production") {
  url = `https://lucuberate.com/api/v1/cubes`;
} else {
  url = "http://localhost:4000/api/v1/cubes";
}

class CubeAPI {
  // static all() {
  //   return fetch(url)
  //     .then(res => res.json())
  //     .catch(err => {
  //       console.log("Error fetching data in CubeAPI.all", err);
  //     });
  // }

  static create(newCube) {
    return fetch(url, {
      method: "POST",
      body: newCube,
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CubeAPI.create", err);
        return { message: "Error fetching data in CubeAPI.create", err: err };
      });
  }

  static getOne(id) {
    return fetch(`${url}/${id}`)
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CubeAPI.getOne", err);
        return { cube: {} };
      });
  }

  static update(updatedCube, id) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      body: updatedCube,
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CubeAPI.update", err);
        return { message: "Error fetching data in CubeAPI.update" };
      });
  }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CubeAPI.delete", err);
        return { message: "Error fetching data in CubeAPI.delete" };
      });
  }
}

export default CubeAPI;
