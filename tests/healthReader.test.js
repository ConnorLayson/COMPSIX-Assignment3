const { healthMetricsCounter } = require("../healthReader");

test("Reads valid JSON", async () => {
  const result = await healthMetricsCounter("./data/health-metrics.json");
  expect(result).toHaveProperty("totalEntries");
});

test("Throws error on missing file", async () => {
  await expect(
    healthMetricsCounter("./bad.json")
  ).rejects.toThrow();
});
