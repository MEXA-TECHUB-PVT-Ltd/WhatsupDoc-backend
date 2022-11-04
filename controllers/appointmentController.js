const  mongoose = require('mongoose')

const appointmentModel= require('../models/appointmentModel');
const cloudinary = require("../utils/cloudinary")
const other_patient_details= require("../models/other_patient_detailsModel")

exports.createAppointment = async (req,res)=>{



    try{
            
    const bookedby_patient_id= req.body.bookedby_patient_id;
    const type_of_work = req.body.type_of_work;
    const for_yourself= req.body.for_yourself;
    const disease = req.body.disease;
    const description= req.body.description;
    const for_other = req.body.for_other;
    const doctor_id = req.body.doctor_id;
    const work_day_for_office_id= req.body.work_day_for_office_id;
    const work_day_for_office_timing_id= req.body.work_day_for_office_timing_id;
    const status = req.body.status;
    const name = req.body.name;
    const gender = req.body.gender;
    const age = req.body.age;
    const relation_with_patient = req.body.relation_with_patient;


    console.log(for_yourself,for_other , status, bookedby_patient_id, doctor_id)
    
    if(for_other && for_yourself && status && bookedby_patient_id && doctor_id && work_day_for_office_id &&work_day_for_office_timing_id ){

    const foundResult= await  appointmentModel.findOne({work_day_for_office_id:work_day_for_office_id , doctor_id:doctor_id , 
    work_day_for_office_timing_id:work_day_for_office_timing_id,  status:'scheduled' });

    

    if(for_yourself=="true" && for_other=="false"){
        console.log(for_yourself)
        if(!foundResult){
            //images uploading to cloudinary
            if(req.files){
                if(req.files.length > 0){
                    console.log(req.files)
                
                        var pathsArray = [];
                        for (const file of req.files){
                            const {path}= file
                            const c_result = await cloudinary.uploader.upload(path)
                             pathsArray.push({
                                imgUrl: c_result.secure_url,
                                public_id:c_result.public_id
                             })
                    
                        }
                        console.log(pathsArray)
                    }
            }


            const savedAppointment  = new appointmentModel({
                _id:mongoose.Types.ObjectId(),
                bookedby_patient_id:bookedby_patient_id,
                type_of_work:type_of_work,
                for_yourself:for_yourself,
                disease:disease,
                description:description,
                images:pathsArray,
                for_other:for_other,
                doctor_id:doctor_id,
                work_day_for_office_id:work_day_for_office_id,
                work_day_for_office_timing_id:work_day_for_office_timing_id,
                status:status
            })

            const result = await savedAppointment.save();

            if(result){
                res.json({
                    message: "appointment saved successfully",
                    result: result,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message: "Could not saved appointment",
                    statusCode:400,
                    status:"failed"
                })
            }
        }
        else{
            res.json({
                message: "Slot already booked",
                status:"failed",
                statusCode:404
            })
        }

    }
    else if(for_yourself=="false" && for_other=="true"){      
        if(!foundResult){

            //images uploading to cloudinary
            if(req.files){
                if(req.files.length > 0){
                    console.log(req.files)
                
                        var pathsArray = [];
                        for (const file of req.files){
                            const {path}= file
                            const c_result = await cloudinary.uploader.upload(path)
                             pathsArray.push({
                                imgUrl: c_result.secure_url,
                                public_id:c_result.public_id
                             })
                    
                        }
                        console.log(pathsArray)
                    }
            }
            const otherPatient= new other_patient_details({
                _id:mongoose.Types.ObjectId(),
                name:name,
                gender:gender,
                age:age,
                relation_with_patient:relation_with_patient
            })
    
            const saveOtherPatientDetails = await otherPatient.save();
            if(saveOtherPatientDetails){
                var other_patient_id = saveOtherPatientDetails._id;
            }



            const savedAppointment  = new appointmentModel({
                _id:mongoose.Types.ObjectId(),
                bookedby_patient_id:bookedby_patient_id,
                type_of_work:type_of_work,
                for_yourself:for_yourself,
                disease:disease,
                description:description,
                images:pathsArray,
                for_other:for_other,
                doctor_id:doctor_id,
                work_day_for_office_id:work_day_for_office_id,
                work_day_for_office_timing_id:work_day_for_office_timing_id,
                status:status,
                other_patient_id,other_patient_id
            })

            const result = await savedAppointment.save();

            if(result){
                res.json({
                    message: "appointment saved successfully",
                    result: result,
                    statusCode:201
                })
            }
            else{
                res.json({
                    message: "Could not saved appointment",
                    statusCode:400,
                    status:"failed"
                })
            }
        }
        else{
            res.json({
                message: "Slot already booked",
                status:"failed",
                statusCode:404
            })
        }
    }
        }
        else{
            res.json({
                message:"for_other, for_yourself , status ,bookedby_patient_id , doctor_id , work_day_for_office_id , work_day_for_office_timing_id , cannot be null"
            })
        }
    }
    catch(err){
        res.json({
            message: "Error occurred",
            error:err.message
        })
    }
    

    
}

exports.getAllAppointments = async (req,res)=>{
    try{
        const result = await appointmentModel.find({}).populate("bookedby_patient_id").populate("other_patient_id");

        if(result){
            res.json({
                message: "Fetched successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message:"Could not fetched",
                result:null,
            })
        }
    }
    catch(err){
        res.json(err)
    }
}

exports.getAppointmentByAppointmentId = async (req,res)=>{
    try{
        const appointment_id = req.query.appointment_id;
        const result = await appointmentModel.find({_id:appointment_id}).populate("bookedby_patient_id").populate("other_patient_id");

        if(result){
            res.json({
                message: "Fetched successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message:"Could not fetched",
                result:null,
            })
        }
    }
    catch(err){
        res.json(err)
    }
}

exports.getAllDoctorAppointments = async (req,res)=>{
    try{
        const doc_id = req.query.doc_id;
        const status =req.query.status;

        let result;

        if(doc_id && !status){
             result = await appointmentModel.find({doctor_id:doc_id}).populate("bookedby_patient_id").populate("other_patient_id");
        }

        if(doc_id && status){
            result = await appointmentModel.find({doctor_id:doc_id , status:status}).populate("bookedby_patient_id").populate("other_patient_id");
        }



        if(result){
            res.json({
                message: "doctor appointments Fetched successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message:"Could not fetched",
                result:null,
            })
        }
    }
    catch(err){
        res.json(err)
    }
}

exports.getAllAppointmentsOfPatient = async (req,res)=>{
    try{
        const patient_id = req.query.patient_id;
        const status =req.query.status;

        let result;

        if(patient_id && !status){
             result = await appointmentModel.find({patient_id:patient_id}).populate("bookedby_patient_id").populate("other_patient_id");
        }

        if(patient_id && status){
            result = await appointmentModel.find({patient_id:patient_id , status:status}).populate("bookedby_patient_id").populate("other_patient_id");
        }



        if(result){
            res.json({
                message: "patient appointments Fetched successfully",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message:"Could not fetched",
                result:null,
            })
        }
    }
    catch(err){
        res.json(err)
    }
}

exports.changeAppointmentStatus = async (req , res) =>{

    try{
        const appointment_id= req.body.appointment_id;
        const status = req.body.status;
        const review = req.body.review;
        const rating_stars = req.body.rating_stars;

        const result = await appointmentModel.findOneAndUpdate({_id: appointment_id}, 
        {
            status:status,
            review:review,
            rating_stars:rating_stars
        },
        {
            new:true
        }
        )
        
        if(result){
            res.json({
                message:  `status has been changed to ${status}`,
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: `status has not changed , appointment with this id may not exist`,
                statusCode:404
            })
        }

        
    }
    catch(err){
        res.json({
            error:err.message,
        })
    }
}

exports.deleteAppointment = async (req , res) =>{
    try{
        const appointment_id= req.body.appointment_id;
        const result = await appointmentModel.deleteOne({_id: appointment_id});        
        if(result.deletedCount>0){
            res.json({
                message: "Successfully deleted appointment",
                result:result,
                statusCode:200
            })
        }
        else{
            res.json({
                message: "could not delete appointment",
                statusCode:404
            })
        }
    }
    catch(err){
        res.json({
            error:err.message,
        })
    }
}

