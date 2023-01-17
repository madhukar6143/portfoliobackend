const exp = require("express");
const userApp = exp.Router();
const requestIp = require('request-ip');
const ipfetch = require('ip-fetch');
const mongoClient = require('mongodb').MongoClient;
const dbConnectionString  = "mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"
let messageCollection, countCollection, locationCollection;


mongoClient.connect(dbConnectionString)
  .then(client => {
    //create DB object
    const dbObj = client.db("portfolio");
    //get collection object
    messageCollection = dbObj.collection("messageData")
    //share userCollectionObj
    console.log("Connected to messageDB ")
  })
  .catch(err => console.log("err in connecting to DB ", err))



  mongoClient.connect(dbConnectionString)
  .then(client => {
    //create DB object
    const dbObj = client.db("portfolio");
    //get collection object
    
    countCollection = dbObj.collection("track")
    //share userCollectionObj
    console.log("Connected to dataDB ")
  })
  .catch(err => console.log("err in connecting to DB ", err))



  mongoClient.connect(dbConnectionString)
  .then(client => {
    //create DB object
    const dbObj = client.db("portfolio");
    //get collection object
    locationCollection = dbObj.collection("locationData")
    //share userCollectionObj
    console.log("Connected to locationDB ")
  })
  .catch(err => console.log("err in connecting to DB ", err))






//middleware to parse  body of req
userApp.use(exp.json());

//define routes
//route for GET req for all users
userApp.get("/data", async (request, res) => {
  //get usercollectionobj
  //get data
  //send res
  userApp.use(requestIp.mw());
  userApp.use(async(req, res) =>{
      const clientIp = req.clientIp;
      let info = await ipfetch.getLocationNpm(clientIp);
    
      await locationCollection.insertOne(reqObj);
      
  }
  )


});



/*----------------------------------------------------------------------------------*/
//route for POST req
userApp.post("/create-user", async (request, response) => {
  //get usercollectionobj
  //get userObj from client
  let userObj = await request.body;
  //verify existing user
  let userOfDB = await messageCollection.findOne({
    username: userObj.username,
  });

  //if user existed
  if (userOfDB !== null) {
    response.send({ message: "Duplicate Data" });
  }
  //if user not existed
  else {
    await messageCollection.insertOne(userObj);
    response.send({ message: "Message Sent" });
  }
});
/*----------------------------------------------------------------------------------*/





/*----------------------------------------------------------------------------------*/
userApp.post("/track", async (request, response) => {

  //get userObj from client
  let userObj = await request.body;

  //verify existing date
  let userOfDB = await countCollection.findOne({
    currentDate: userObj.currentDate
  });

  //if date existed update
  if (userOfDB !== null) {
    userObj = { ...userObj, count: userOfDB.count + 1 }
    let res = await countCollection.updateOne(
      { currentDate: userObj.currentDate },
      { $set: { ...userObj } }
    );

    //response.send({ message: "Message Sentvhgvghhgfhj" });
  }
  //if user not existed add new
  else {
    await countCollection.insertOne(userObj);
    // response.send({ message: "Message Sent" });
    //send res
  }

});

/*----------------------------------------------------------------------------------*/


//export userApp
module.exports = userApp;





/*


//connect to mongodb
const client = new MongoClient(uri, { useNewUrlParser: true });
try {
   client.connect();
  const dbObj = client.db("portfolio");
  locationCollection = dbObj.collection("locationData")
  countCollection = dbObj.collection("track")
  messageCollection = dbObj.collection("messageData")
} catch (err) {
  console.log("error in connecting mongoDB", err);
}

      
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
*/