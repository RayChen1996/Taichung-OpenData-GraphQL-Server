const Book = require("../../models/book");

exports.Publish = {
  books: async (parent, args) => {
    const { _id } = parent;
    return await Book.find({ publishId: _id.toString() });
  },
};
