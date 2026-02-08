const fs = require("fs");
const csv = require("csv-parser");

function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];

    fs.createReadStream(filePath)
      .on("error", (err) => {
        console.error("Error reading CSV file.");
        reject(err);
      })
      .pipe(csv())
      .on("data", (row) => workouts.push(row))
      .on("end", () => {
        try {
          let totalMinutes = 0;

          for (let i = 0; i < workouts.length; i++) {
            totalMinutes += Number(workouts[i].minutes);
          }

          console.log(`Total workouts: ${workouts.length}`);
          console.log(`Total minutes: ${totalMinutes}`);

          resolve({
            totalWorkouts: workouts.length,
            totalMinutes
          });
        } catch (err) {
          reject(err);
        }
      });
  });
}

module.exports = { workoutCalculator };
