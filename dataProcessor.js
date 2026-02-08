require("dotenv").config();

const { workoutCalculator } = require("./workoutReader");
const { healthMetricsCounter } = require("./healthReader");

async function processFiles() {
  try {
    const name = process.env.USER_NAME;
    const goal = Number(process.env.WEEKLY_GOAL);

    console.log(`Processing data for: ${name}`);

    console.log("📁 Reading workout data...");
    const workoutData = await workoutCalculator("./data/workouts.csv");

    console.log("📁 Reading health data...");
    const healthData = await healthMetricsCounter("./data/health-metrics.json");

    console.log("\n=== SUMMARY ===");
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthData.totalEntries}`);
    console.log(`Weekly goal: ${goal} minutes`);

    if (workoutData.totalMinutes >= goal) {
      console.log(`🎉 Congratulations ${name}! You have exceeded your weekly goal!`);
    } else {
      console.log(`Keep going ${name}! You're almost there!`);
    }

  } catch (err) {
    console.error("Processing failed:", err.message);
  }
}

processFiles();
