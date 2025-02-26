const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path"); // for ejs templates
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

// this is the code to connect monogdb
MONGO_URL = "mongodb://127.0.0.1:27017/wanderlusts";

main()
  .then(() => {
    console.log("connect to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// for ejs templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// creating basic api and  / -> this is root route
app.get("/", (req, res) => {
  console.log("root route");
  // using res.send we send message to front part of web page
  res.send("hi this is root route ");
});

// index route :- it show our listing on frontend
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

// app.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   console.log(allListings);
//   res.render("./listings/index.ejs", { allListings });
// });

// new route :- this show a form by these we add new list
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

// show route :- this route show details of particular list
app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);
  res.render("./listings/show.ejs", { listings });
});

// create route
app.post("/listings", async (req, res) => {
  // app.post pe request aayegi
  // const { title, description, image, price, location, country } = req.body;
  // const listing = req.body.listing;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// edit route
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listings });
});

// update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

// update route
// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   console.log(req.body.listing);
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });

// update route
// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   console.log(req.body.listing);
//   let newl = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   console.log(newl);
//   res.redirect(`/listings/${id}`);
// });

// delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
});

// to start server we use app.listen  at port 8080
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

// here we create new route and insert sample data and see our Listing model
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "my sweet Home",
//     description: "Nice place and this is place where you fell good",
//     price: 1000,
//     location: "jaipur",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample saved");
//   res.send("Successfull");
// });
