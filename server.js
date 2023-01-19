const express = require("express");
const app = express();
const exp = require("express");
const requestIp = require('request-ip');
const ipfetch = require('ip-fetch');
const mongoClient = require('mongodb').MongoClient;
const dbConnectionString  = "mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"


//import userApp&productApp
const dataApi = require("./APIS/DataApi");

const cors = require('cors')
const corsOptions = {
    origin: ["http://localhost:3000", "https://madhukar-eppalapelly.netlify.app"],
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


//execute routes based on path
app.use("/user", dataApi)




  
app.use(requestIp.mw());

app.get("/location", async (req, res) => {

    //get userObj from client
      await mongoClient.connect(dbConnectionString)
          .then(async(client) => {
              //create DB object
              const dbObj = client.db("portfolio");
              //get collection object
  
              dataCollectionObject = dbObj.collection("locationStats")
              //share userCollectionObj
              console.log("Connected to locationDB ")

              const clientIp = req.clientIp;
              let info = await ipfetch.getLocationNpm(clientIp);
              let userOfDB = await dataCollectionObject.findOne({
                  "query": info.query
              });
              console.log(info.query)
              if (userOfDB !== null) {
                  userOfDB = { ...userOfDB, count: userOfDB.count + 1 }
                  let res = await dataCollectionObject.updateOne(
                      { query: userOfDB.query },
                      { $set: { ...userOfDB } }
                  );
                  //if date existed update
          
                  //response.send({ message: "Message Sentvhgvghhgfhj" });
              }
              //if user not existed add new
              else {
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
                      "query": info.query,
                      "count": 1
                  }
                  await dataCollectionObject.insertOne(reqObj);
                  // response.send({ message: "Message Sent" });
                  //send res
              }
              
              client.close()
              res.send({ message: "port backend" })
          })
          .catch(err => console.log("err in connecting to locationDB ", err))
  }
  )
  
  

app.get("*", async(req, res) => {
    
        res.json({message:"Home"});

});

const port = 5000;
app.listen(port, () => console.log("server on port 5000..."))




/*

    app.use(requestIp.mw());
        const clientIp = await req.clientIp;
        
        let info = await ipfetch.getLocationNpm("124.123.186.218");
        console.log(info)
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
        console.log(reqObj)
        try {
            await connectToMongo()
            let response = await dataCollectionObject.insertOne(reqObj);
            console.log(response)
        } catch (e) {
            console.log("error in insertion", e);
        }

        res.send({ message: "https://madhukar-eppalapelly.netlify.app" })

        */


