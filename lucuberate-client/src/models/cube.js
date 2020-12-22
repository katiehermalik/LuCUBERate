
let url;
if (process.env.NODE_ENV === 'production') {
  url = `https://lucuberate.herokuapp.com/api/v1/cubes`;
} else {
  url = 'http://localhost:4000/api/v1/cubes';
}


class CubeModel {
  
  static all() {
    return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in CubeModel.all', err)
    });
  }

  static create(newCube) {
    return fetch(url, {
      method: 'POST',
      body: newCube 
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

  static update(updatedCube, id) {
    return fetch(`${url}/${id}`, {
      method: 'PUT',
      body: updatedCube
    })
    .then((res) => console.log(res.json()))
    .catch((err) => {
      console.log('Error fetching data in CubeModel.update', err)
      return { message: 'Error fetching data in CubeModel.update' };
    });
  }

  static delete(id) {
    return fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log('Error fetching data in CubeModel.delete', err)
      return { message: 'Error fetching data in CubeModel.delete' };
    });
  }

}

export default CubeModel