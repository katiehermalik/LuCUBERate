import { categoriesUrl } from "../../config/multi-environment";

class CategoryAPI {
  static create(newCategory) {
    return fetch(categoriesUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CategoryAPI.create", err);
        return { message: "Error fetching data in CategoryAPI.create" };
      });
  }

  static delete(id) {
    return fetch(`${categoriesUrl}/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CategoryAPI.delete", err);
        return { message: "Error fetching data in CategoryAPI.delete" };
      });
  }

  static shuffle(id) {
    return fetch(`${categoriesUrl}/${id}`, {
      method: "PUT",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CategoryAPI.delete", err);
        return { message: "Error fetching data in CategoryAPI.delete" };
      });
  }
}

export default CategoryAPI;
