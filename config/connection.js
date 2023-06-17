

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/project6")
  .then(() => {
    console.log("connect");
  })
  .catch(() => {
    console.log("fail");
  });




const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  lname: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  pass: {
    type: "String",
    required: true,
  },
});
const adminSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
});
const collection = mongoose.model("Users", userSchema);
const admincol = mongoose.model("admins", adminSchema);
module.exports = { collection: collection, admincol: admincol };
