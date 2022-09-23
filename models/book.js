const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  publishId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Publish",
  },
  authorId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Author",
  },
  ISBN: String,
  position: String,
  haveImage: String,
  createAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Book", bookSchema);
