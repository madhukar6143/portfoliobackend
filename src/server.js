const exp=require("express");
const mongoClient=require("mongodb").MongoClient;
const path=require("path")
const app=exp()

const cors = require('cors')
const corsOptions ={
    origin:["http://localhost:3000","https://madhukar-eppalapelly.netlify.app"], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//connecting react build with express server
//app.use(exp.static(path.join(__dirname, "./build")));
app.get("/", (req, res) => {
    res.send("Home page");
  });

//connect to DB


//import userApp&productApp
const dataApi=require("./APIS/DataApi");

//execute routes based on path
app.use("/user",dataApi)

//assign port
const port=5000;
app.listen(port,()=>console.log("server on port 5000..."))