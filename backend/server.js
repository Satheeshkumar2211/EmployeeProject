const express = require("express");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");
const path = require("path");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

// routes
app.use("/employees", employeeRoutes);

// default route
app.get("/", (req, res) => {
  res.send("🚀 Employee Management Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
