const url = `http://localhost:4000/api/v1/cubes`


class CubeModel {
  static create(newCube) {
    let body = JSON.stringify({ 
      "cube": newCube,
      "user": JSON.parse(localStorage.getItem("user")),
    })
    console.log(body)
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
      
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in CubeModel.create', err)
      return { message: 'Error fetching data in CubeModel.create' };
    });
  }

}

export default CubeModel