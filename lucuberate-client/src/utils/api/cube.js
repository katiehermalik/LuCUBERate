import { cubesUrl } from "../../config/multi-environment";

class CubeAPI {
  static create(newCube) {
    return fetch(cubesUrl, {
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
    return fetch(`${cubesUrl}/${id}`)
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CubeAPI.getOne", err);
        return { cube: {} };
      });
  }

  static update(updatedCube, id) {
    return fetch(`${cubesUrl}/${id}`, {
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
    return fetch(`${cubesUrl}/${id}`, {
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
