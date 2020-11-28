const db = require("./models");
const data = require("./cubeData.json");

db.Cube.deleteMany({}, (err, deletedCubes) => {
  db.Cube.insertMany(data.cubes, (err, seededCubes) => {
    if (err) console.log(err);

    console.log(data.cubes.length, "cubes created successfully");

    process.exit();
  });
});
