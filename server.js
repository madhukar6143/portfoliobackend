const express = require("express");
const app = express();
const requestIp = require('request-ip');

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

app.get("/", async(req, res) => {

    
  app.use(requestIp.mw());
app.use(async(req, res) =>{
    const clientIp = req.clientIp;
      let info = await ipfetch.getLocationNpm(clientIp);
        res.json({ip:info});
}
)
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