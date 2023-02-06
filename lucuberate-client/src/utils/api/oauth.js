let oauthUserDataUrl;

if (process.env.NODE_ENV === "production") {
  oauthUserDataUrl = `https://lucuberate.com/api/v1/oauth/user`;
} else {
  oauthUserDataUrl = `http://localhost:4000/api/v1/oauth/user`;
}

class OauthAPI {
  static oauthUserData() {
    return fetch(oauthUserDataUrl, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .catch(err => {
        console.log("Error fetching data in AuthAPI.oauthLogin", err);
        return { message: "Error fetching data in AuthAPI.oauthLogin" };
      });
  }
}

export default OauthAPI;
