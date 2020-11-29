const signupUrl = `http://localhost:4000/api/signup`

class UserModel {
  static create(newUser) {
    return fetch(signupUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in UserModel.create', err)
      return { message: 'Error fetching data in UserModel.create' }
    })
  }
}

export default UserModel;