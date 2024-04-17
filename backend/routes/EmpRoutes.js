const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const EmpController = require("../controller/EmpController")

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    } 
});

const upload = multer({ storage: storage });

// Serve static files
router.use("/images", express.static(path.join(__dirname, "../upload/images")));

router.post("/upload", upload.single("product"), EmpController.uploadImage);


router.post("/emp", EmpController.postEmp);


router.get("/empdetails", EmpController.getEmp);

 
router.get("/empdetails/:id", EmpController.getEmpById)


router.put("/update/:id", EmpController.updateEmp)


router.delete("/remove", EmpController.deleteEmp)



module.exports = router;
