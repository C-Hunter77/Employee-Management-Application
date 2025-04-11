const pool = require('./connection');

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Connection error:", err.stack);
  } else {
    console.log("✅ Connected at:", res.rows[0].now);
  }
  pool.end();
});
