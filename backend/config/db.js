const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",   // XAMPP default
    password: "",   // usually empty in XAMPP
    database: "employeedb"  // neenga create pannina DB
});

db.connect(err => {
    if (err) {
        console.error("❌ DB connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

module.exports = db;
