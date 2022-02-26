const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const authtSchema = new Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("auth", authtSchema);
