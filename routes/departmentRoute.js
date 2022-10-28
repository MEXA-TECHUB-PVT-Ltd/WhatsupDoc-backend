


const express = require('express');
const router = express.Router();
const controller = require("../controllers/departmentController")
const auth = require("../middlewares/auth")
const upload= require("../middlewares/multer")

router.post("/createDepartment" , upload.fields([
    {
        name:"profile_img",
        maxCount:1
    },{
        name:"images",
        maxCount:100
    }
]),controller.createDepartment)

router.get("/getAllDepartments", controller.getAllDepartments)
router.get("/getDepartmentById/:departmentId", controller.getDepartmentById)

// router.get("/getAllHospitals" , controller.getAllHospitals)
// router.get("/getHospitalById/:hospital_id" , controller.getHospitalById)
// router.delete("/deleteHospitalProfile/:hospital_id" , controller.deleteHospitalProfile)
module.exports= router;