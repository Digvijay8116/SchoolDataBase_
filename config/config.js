const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://Digvijay:Test12345@cluster0.hv2anhk.mongodb.net/SchoolDataBase_?retryWrites=true&w=majority&appName=Cluster0";

  "mongodb://localhost:27017/ss";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
