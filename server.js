const express = require("express");
const app = express();
const requestIp = require('request-ip');
const ipfetch = require('ip-fetch');
const mongoClient = require("mongodb").MongoClient;
const dbConnectionString = "mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"
let dataCollectionObject;

//import userApp&productApp
const dataApi = require("./APIS/DataApi");

const cors = require('cors')
const corsOptions = {
    origin: ["http://localhost:3000", "https://madhukar-eppalapelly.netlify.app"],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

async function connectToMongo() {
    try {
        const client = await mongoClient.connect(dbConnectionString, { useNewUrlParser: true });
        //create DB object
        const dbObj = client.db("portfolio");
        //get collection object

        dataCollectionObject = dbObj.collection("locationData")
        //share userCollectionObj
        console.log("Connected to locationDB ")


    } catch (error) {
        console.log("err in connecting to DB ", error);
    }
}


//execute routes based on path
app.use("/user", dataApi)

app.use(requestIp.mw());
app.use(async (req, res) => {
    const clientIp = req.clientIp;
    let info = await ipfetch.getLocationNpm("124.123.186.218");
    reqObj =
    {
        "country": info.country,
        "region": info.region,
        "regionName": info.regionName,
        "city": info.city,
        "zip": info.zip,
        "lat": info.lat,
        "lon": info.lon,
        "org": info.org,
        "as": info.as,
        "query": info.query
    }
    try {
       await  connectToMongo()
        let response = await dataCollectionObject.insertOne(reqObj);
        if (response.acknowledged === true) {
           
           // res.send({ message: "successful" })
        }
        else {
              // res.send({ message: "unsuccesful" })
        }
    } catch (e) {
        console.log("error in insertion", e);
    }

});
const port = 5000;
app.listen(port, () => console.log("server on port 5000..."))