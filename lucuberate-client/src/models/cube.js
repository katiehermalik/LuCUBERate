const url = `http://localhost:4000/api/v1/cubes`


class CubeModel {
  static create(newCube) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCube),
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in CubeModel.create', err)
      return { message: 'Error fetching data in CubeModel.create' };
    });
  }

}

export default CubeModel