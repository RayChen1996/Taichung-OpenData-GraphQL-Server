const Book = require("../../models/book");

exports.Author = {
  books: async (parent, args) => {
    const { _id } = parent;
    return await Book.find({ authorId: _id.toString() });
  },
};
