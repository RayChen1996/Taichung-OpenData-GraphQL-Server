const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publishSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Publish", publishSchema);
