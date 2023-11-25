const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const app = express();
// Web 3
const Web3 = require("web3");
const { DB_USER, DB_PASS, DB_NAME } = require("./config");
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    // "http://127.0.0.1:8545"
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
);
// Socket
const http = require("http");
const { Server } = require("socket.io");
const saveActivity = require("./middleware/activity/save-activity");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: "*" } });

// var web3 = new Web3(Web3.givenProvider);
// const web3 = new Web3(Web3.givenProvider);
// console.log(web3);
// console.log(web3.eth);
// * Database connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  console.log("db connected!");
});


// const connect = mongoose.createConnection(
//   `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.eoppj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
// var gfs;
// connect.once("open", function () {
//   gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//     bucketName: "uploads",
//   });
// });

// * Cors
app.use(
  cors({
    origin: "*",
    credentialsL: "*",
  })
);

// * Body Parser
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("short"));

// * Api routes
app.use(
  "/api/v1",
  (req, res, next) => {
    req.web3 = web3;
    req.Web3 = Web3;
    req.io = io;

    // req.gfs = gfs;
    next();
  },
  routes
);
// const fn = async (req, res, next) => {
//   return setTimeout(() => {
//     console.log("2");
//     // next();
//     // return;
//   }, 3000);
// };
app.get("/", async (req, res, next) => {
  console.log("hello");
  // res.send("check")
  // console.log("1");
  // await fn(req, res, next);
  // req.io = io;
  // req.userId = "6378c45277ad7bfa27a88s99ds";
  // await saveActivity(req, res, "test");
  // console.log("3");
  return res.status(200).json({ status: 200, message: "Dreamub" });
});
// const cloudinary = require("cloudinary").v2;

// var multipart = require("connect-multiparty");
// var multipartMiddleware = multipart();
// app.post("/", multipartMiddleware, async (req, res) => {
//   console.log("hello files");
//   console.log(req.files);

//   const cloudObj = await cloudinary.uploader.upload(req.files.da.path);
//   res.status(200).json({ status: 200, files: req.files, cloudObj });
// });

io.on("connection", (socket) => {
  //when connect
  console.log("New client connected with id: ", socket.id);

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!", socket.id);
  });
});

app.use("*", (req, res) => {
  res.status(404).send("Route not found");
});

let PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
});

//const coins  = await web3.eth.getBalance("0x6fe490525667C23E72479C05476eCc19942E0e37");
// const coinsRealValue =  await web3.utils.fromwei(coins, "ether");

// const logger = require("./logger");

// logger.info("information log");
// logger.warn("warning log");
// logger.error("error log");
// logger.debug("debug log");

// function sayHello() {
//   console.log("I am Index file");
// }

// const fs = require("fs");
// const fieaw = fs.readFileSync("errors.log", "utf8");
// console.log("dada", fieaw);
