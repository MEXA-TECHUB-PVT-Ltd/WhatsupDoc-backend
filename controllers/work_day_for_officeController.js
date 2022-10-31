
const mongoose = require("mongoose")
const work_day_for_officeModel= require("../models/work_day_for_officeModel")


exports.createWorkDayForOffice = async (req,res)=>{


    try{
        const doc_id = req.body.doc_id;
        const day= req.body.day;
        const type_of_work = req.body.type_of_work;
        
        const newWorkDay = new work_day_for_officeModel({
            _id:mongoose.Types.ObjectId(),
            doc_id:doc_id,
            day:day,
            type_of_work:type_of_work,
        })

        const result = await newWorkDay.save();
        if(result){
            res.json({
                message: "New work day has been created",
                result: result,
                statusCode:201
            })
        }
        else{
            res.json({
                message: "work day could not be created",
                result: result,
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred while creating work day"
        })
    }

}