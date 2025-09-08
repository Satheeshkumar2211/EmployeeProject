const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all employees
exports.getEmployees = (req, res) => {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Add new employee
exports.addEmployee = (req, res) => {
    const { name, employeeId, department, designation, project, type, status } = req.body;
    const image_id = req.file ? req.file.filename : null;

    db.query(
        "INSERT INTO employees (name, employeeId, department, designation, project, type, status, image_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, employeeId, department, designation, project, type, status, image_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Employee added", id: result.insertId, image_id });
        }
    );
};



// Update employee
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, department, designation, project, type, status } = req.body;
    const image_id = req.file ? req.file.filename : null;

    let sql, params;

    if (image_id) {
        sql = "UPDATE employees SET name=?, department=?, designation=?, project=?, type=?, status=?, image_id=? WHERE id=?";
        params = [name, department, designation, project, type, status, image_id, id];
    } else {
        sql = "UPDATE employees SET name=?, department=?, designation=?, project=?, type=?, status=? WHERE id=?";
        params = [name, department, designation, project, type, status, id];
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Employee updated", image_id: image_id || "unchanged" });
    });
};



// Delete employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM employees WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Employee deleted" });
    });
};
