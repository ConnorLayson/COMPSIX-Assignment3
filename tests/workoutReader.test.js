const { workoutCalculator } = require("../workoutReader");

test("Reads valid CSV", async () => {
  const result = await workoutCalculator("./data/workouts.csv");
  expect(result).toHaveProperty("totalMinutes");
});

test("Error when file missing", async () => {
  await expect(
    workoutCalculator("./bad.csv")
  ).rejects.toThrow();
});
