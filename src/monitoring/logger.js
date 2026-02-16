class Logger {
  info(message, data = {}) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
  }

  error(message, error = {}) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
  }

  warn(message, data = {}) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
  }
}

module.exports = new Logger();

app.get("/api/health", async (req, res) => {
  const dbHealth = await pool.query("SELECT NOW()");

  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: dbHealth.rows ? "connected" : "disconnected",
    uptime: process.uptime(),
  });
});
