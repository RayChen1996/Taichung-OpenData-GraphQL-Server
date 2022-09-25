const Book = require("../../models/book");

exports.FilterBook = {
  books: async (parent, args) => {
    // _id 有可能是作者id或出版社id
    const { _id } = parent;

    const searchBooksByAuthorId = await Book.find({ authorId: _id.toString() });

    const searchBooksByPublishId = await Book.find({
      publishId: _id.toString(),
    });

    if (searchBooksByAuthorId != "") return searchBooksByAuthorId;

    if (searchBooksByPublishId != "") return searchBooksByPublishId;

    return [];
  },
};
