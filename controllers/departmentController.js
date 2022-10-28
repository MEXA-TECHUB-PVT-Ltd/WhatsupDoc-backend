
const mongoose = require("mongoose")
const departmentModel = require("../models/departmentsModel")
const cloudinary = require("../utils/cloudinary")


exports.createDepartment= async(req,res)=>{

    try{
        const name = req.body.name;
        const opening_time=req.body.opening_time;
        const closing_time= req.body.closing_time;
        const hospital_id = req.body.hospital_id;

        if(req.files.profile_img){
            const c_result= await cloudinary.uploader.upload(req.files.profile_img[0].path)
            var profile_img = {
                 imgUrl:c_result.secure_url,
                 public_id:c_result.public_id
                 }
                 
                console.log(profile_img)
        }

        if(req.files.images){
            if(req.files.images.length > 0){
                console.log(req.files.images)
            
                    var pathsArray = [];
                    for (const file of req.files.images){
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
        


            const newDepartment = new departmentModel({
                _id:mongoose.Types.ObjectId(),
                name,
                opening_time:opening_time,
                closing_time:closing_time,
                profile_img:profile_img,
                images:pathsArray,
                hospital_id:hospital_id,

            })

            const result= await newDepartment.save();

            if(result){
                res.json({
                    message: "department created successfully",
                    result:result,
                    statusCode:200

                })
            }
            else{
                res.json({
                    message: "department could not be created",
                    status:"failed"
                })
            }
        }

        catch(err){
            res.json({
                message:"error occurred",
                error:err.message,
            })
        }
    }

    exports.getAllDepartments = async (req,res)=>{

        try{
            const result=await departmentModel.find({}).populate("hospital_id")

            if(result){
                res.json({
                    message: "All departments have been fetched successfully",
                    result: result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"could not fetch  departments"
                    
                })
            }
        }
        catch(err){
            res.json(err);
        }
    }

    exports.getDepartmentById = async (req,res)=>{

        try{
            const departmentId= req.params.departmentId;
            const result=await departmentModel.findOne({_id:departmentId}).populate("hospital_id")

            if(result){
                res.json({
                    message: "department with this id is fetched",
                    result: result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"could not fetch  department with this id "
                })
            }
        }
        catch(err){
            res.json(err);
        }
    }