
const mongoose = require("mongoose")

const appointmentHistorySchema= new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    appointment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"appointment"
    },
    transaction_id:String,
    table_name_to:String,
    table_name_from:String,
    transaction_status:String,

})

module.exports = mongoose.model("appointment_history", appointmentHistorySchema);