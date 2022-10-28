const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;
const socket = require("socket.io");



const cors = require('cors');
const { ActivityInstance } = require("twilio/lib/rest/taskrouter/v1/workspace/activity");
const { ConferenceInstance } = require("twilio/lib/rest/api/v2010/account/conference");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


app.use("/user/" , require("./routes/loginsRoute"))
app.use("/admin/" , require("./routes/adminRoute"))
app.use("/subscriptionRate" , require("./routes/subscriptionRateRoute"))
app.use("/hospitalType" , require("./routes/hospitalTypeRoute"))
app.use("/hospital" , require("./routes/hospitalRoute"))
app.use("/subscriptionHistory" , require("./routes/subscriptionHistoryRoute"))
app.use("/department" , require("./routes/departmentRoute"))

const server= app.listen(3000, function () {
    console.log("server started on port 3000")
})
