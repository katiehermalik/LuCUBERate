let url;
if (process.env.NODE_ENV === "production") {
  url = `https://lucuberate.com/api/v1/categories`;
} else {
  url = "http://localhost:4000/api/v1/categories";
}

class CategoryModel {
  // static all() {
  //   return fetch(url)
  //     .then(res => res.json())
  //     .catch(err => {
  //       console.log("Error fetching data in CategoryModel.all", err);
  //     });
  // }

  static create(newCategory) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CategoryModel.create", err);
        return { message: "Error fetching data in CategoryModel.create" };
      });
  }

  // static getOne(id) {
  //   return fetch(`${url}/${id}`)
  //     .then(res => res.json())
  //     .catch(err => {
  //       console.log("Error fetching data in CategoryModel.getOne", err);
  //       return { category: {} };
  //     });
  // }

  // static update(updatedCategory, id) {
  //   return fetch(`${url}/${id}`, {
  //     method: "PUT",
  //     body: updatedCategory,
  //   })
  //     .then(res => res.json())
  //     .catch(err => {
  //       console.log("Error fetching data in CategoryModel.update", err);
  //       return { message: "Error fetching data in CategoryModel.update" };
  //     });
  // }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CategoryModel.delete", err);
        return { message: "Error fetching data in CategoryModel.delete" };
      });
  }

  static shuffle(id) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in CategoryModel.delete", err);
        return { message: "Error fetching data in CategoryModel.delete" };
      });
  }
}

export default CategoryModel;
