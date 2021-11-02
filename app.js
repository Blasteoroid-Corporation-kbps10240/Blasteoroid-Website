//initialisations
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 80;
const hostname= '0.0.0.0';

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

//MONGOOSE SPECIFIC STUFF
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/blastdb");
}

const contactSchema = new mongoose.Schema({  //name of fields must be same as name attribute in input tags of HTML code
  name: String,
  org: String,
  email: String,
  country: String,
  phn: String,
  subj: String,
  comments: String,
});

const Contact = mongoose.model("contacts", contactSchema);

//ENDPOINTS
app.get("/", (req, res) => {
  res.status(200).render("index.pug");
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact.pug");
});
app.get("/products", (req, res) => {
  res.status(200).render("products.pug");
});
app.get("/passvault", (req, res) => {
  res.status(200).render("passvault.pug");
});
app.get("/about", (req, res) => {
  res.status(200).render("about.pug");
});
app.get("/join", (req, res) => {
  res.redirect("https://docs.google.com/forms/d/e/1FAIpQLScPJ53gNluj_lBd5ifwAMNMCekPWxfvZnP6-j1l_4W-uXpPZw/viewform");
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      // res.send("This item has been saved to the database");
      // alert("Contact Submitted Succesfully !");
      res.status(200).render("postsuccess.pug");
    })
    .catch(() => {
      // alert("Contact could not be Submitted !");
      res.status(200).render("contact.pug");
    });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
