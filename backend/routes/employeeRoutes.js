const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "uploads/"); },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.get("/", employeeController.getEmployees);
router.post("/", upload.single("image"), employeeController.addEmployee);
router.put("/:id", upload.single("image"), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
