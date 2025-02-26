const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// design the schema mean how many column in my listing Schema
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: { type: String, default: "listingimage" }, // this will take from local Default filename
    url: {
      // this is for cloud will take url from internet
      type: String,
      default:
        "https://unsplash.com/photos/trees-beside-white-house-IYfp2Ixe9nM",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/trees-beside-white-house-IYfp2Ixe9nM"
          : v,
    },
  },
  price: Number,
  country: String,
  location: String,
});

// // create a Listings model
// const Listing = mongoose.model("Listing", listingSchema);

// module.exports = Listing;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default:
//       "https://unsplash.com/photos/a-bicycle-is-parked-in-front-of-a-row-of-buildings-eqhhz4EbkTo",
//     set: (v) =>
//       v === " "
//         ? "https://unsplash.com/photos/a-bicycle-is-parked-in-front-of-a-row-of-buildings-eqhhz4EbkTo"
//         : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
// });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
