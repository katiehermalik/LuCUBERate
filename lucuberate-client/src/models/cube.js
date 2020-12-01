const url = `http://localhost:4000/api/v1/cubes`


class CubeModel {
  
  static all() {
    return fetch(url)
    // use json, because response comes back as buffer (string) and json converts it to javscript that we can use
      .then((res) => res.json())
      .catch((err) => {
        console.log('Error fetching data in CubeModel.all', err)
        return { game: [] }; // something back as well as error
      });
  }

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

  static getOne(id) {
    return fetch(`${url}/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in CubeModel.getOne', err)
      return { cube: {} };
    });
  }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in GameModel.delete', err)
      return { message: 'Error fetching data in GameModel.delete' };
    });
  }
  
}

export default CubeModel