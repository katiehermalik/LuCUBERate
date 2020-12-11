const db = require("./models");
const data = require("./data.json");

db.Cube.deleteMany({}, (err, deletedCubes) => {
  db.Cube.insertMany(data.cubes, (err, seededCubes) => {
    if (err) console.log(err);
    console.log(data.cubes.length, "cubes created successfully");
    
  });
});

db.User.deleteMany({}, (err, deletedCubes) => {
  db.User.insertMany(data.users, (err, seededCubes) => {
    if (err) console.log(err);
    console.log(data.users.length, "users created successfully");

  });
});
