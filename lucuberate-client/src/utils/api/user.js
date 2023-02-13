import { userUrl } from "../../config/multi-environment";

class UserAPI {
  static userData() {
    return fetch(userUrl, {
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
    return fetch(`${userUrl}/update`, {
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
