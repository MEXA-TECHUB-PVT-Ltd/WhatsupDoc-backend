

const mongoose = require("mongoose");

const work_day_for_office_timingSchema = new mongoose.Schema ({
    _id:mongoose.Schema.Types.ObjectId,
    work_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"work_day_for_office"
    },
    start_time:{
        type:String
    },
    end_time:{
        String
    },
    type_of_work:{
        type:String,
        enum:["onsite" , "video"]
    },
},
{
    timestamps:true,
})

module.exports = mongoose.model("work_day_for_office_timing" , work_day_for_office_timingSchema)