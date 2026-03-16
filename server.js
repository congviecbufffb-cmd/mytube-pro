const API_KEY = "AIzaSyD1OCPoOG0tEmPqlkauPWstNwpMY_b93Ac"
const express = require("express")
const multer = require("multer")
const fs = require("fs")

const app = express()

app.use(express.static("public"))
app.use("/videos",express.static("videos"))

const storage = multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,"videos/")
},
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage:storage})

app.post("/upload",upload.single("video"),(req,res)=>{
res.send("Upload OK")
})

app.get("/videos",(req,res)=>{
const files = fs.readdirSync("videos")
res.json(files)
})

app.listen(3000,()=>{
console.log("MyTube PRO chạy http://localhost:3000")
})