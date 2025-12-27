const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors");
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authroutes")
const leadRoutes = require("./routes/leadroutes")
const seedUsers = require("./seedUser")

const dotenv = require("dotenv")
dotenv.config()

app.use(cors({ origin: "https://lead-management-system-rbac.vercel.app/", 
credentials: true }));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
.then(async()=>{
   console.log("mongodb atlas connected")
   await seedUsers()
})
.catch((err)=> console.error(err))

// app.get("/", (req,res)=>{
//     res.status(200).json("Lead management system")
// })
app.use("/api/auth", authRoutes)
app.use("/api/leads", leadRoutes)

app.listen((process.env.PORT), ()=>{
    console.log(`app listening at http://localhost:${process.env.PORT}`)
})

