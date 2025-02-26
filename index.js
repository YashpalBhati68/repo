// isme data ka initializtion ka code likhenge

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// MONGO_URL = "mongodb://127.0.0.1:27017/wanderlusts";

// main()
//   .then(() => {
//     console.log("connect to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// // using this function we initial database
// const initDB = async () => {
//   await Listing.deleteMany({}); // delete the previous data
//   await Listing.insertMany(initData.data); // initData apne aap mai object aur humne key
//   // data ko access krna hai
//   console.log("data was initialized");
// };

// initDB();

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

MONGO_URL = "mongodb://127.0.0.1:27017/wanderlusts";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
};

initDB();
