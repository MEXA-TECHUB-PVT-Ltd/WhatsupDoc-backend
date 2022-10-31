
const express = require('express');
const router = express.Router();
const controller = require("../controllers/work_day_for_officeController")
const auth = require("../middlewares/auth")

router.post("/createWorkDay" , controller.createWorkDayForOffice)
// router.get("/getAllHospitalTypes" , controller.getAllHospitalTypes)
// router.get("getHospitalTypeById/:hospitalTypeId", controller.getHospitalTypeById)
// router.put("/updateHospitalType", controller.updateHospitalType)
// router.delete("/deleteHospitalType/:hospitalTypeId", controller.deleteHospitalType)

module.exports= router;