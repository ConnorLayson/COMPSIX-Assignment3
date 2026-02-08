const fs = require("fs").promises;

async function healthMetricsCounter(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");

    const json = JSON.parse(data);

    const totalEntries = Array.isArray(json) ? json.length : 0;

    console.log(`Total health entries: ${totalEntries}`);

    return {
      totalEntries
    };

  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Error: Health file not found.");
    } else if (err instanceof SyntaxError) {
      console.error("Error: Invalid JSON format.");
    } else {
      console.error("Unexpected error:", err.message);
    }

    throw err; // important for tests
  }
}

module.exports = { healthMetricsCounter };
