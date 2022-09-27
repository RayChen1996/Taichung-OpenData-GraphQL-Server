const Book = require("../../models/book");
const Author = require("../../models/author");
const Publish = require("../../models/publish");

exports.Query = {
  books: async (_, { filter }) => {
    let Books;
    if (filter?.name) {
      Books = await Book.find({ name: { $regex: filter.name } });
      return { books: Books };
    }

    if (filter?.end != "") {
      console.log(filter);
      Books = await Book.find({})
        .sort({ createAt: -1 })
        .skip(filter?.start)
        .limit(filter?.end);
      return { books: Books };
    }

    Books = await Book.find({}).sort({ createAt: -1 });

    if (Books) return { books: Books };

    return { message: "Error happen!!!" };
  },

  authors: async (_, { filter }) => {
    if (filter?.name)
      return await Author.find({ name: { $regex: filter.name } });

    return await Author.find({});
  },

  publishs: async (_, { filter }) => {
    if (filter?.name)
      return await Publish.find({ name: { $regex: filter.name } });

    return await Publish.find({});
  },

  book: async (parent, args) => {
    if (args?.name) {
      return await Book.find({ name: { $regex: args.name } });
    }

    if (args?.ISBN) {
      return await Book.find({ ISBN: { $regex: args.ISBN } });
    }

    return [];
  },

  searchBook: async (parent, args) => {
    let bookExists = await Book.exists({ ISBN: args.ISBN });
    return bookExists;
  },
  author: async (parent, args) => {
    return await Author.find({ name: { $regex: args.name } });
  },

  publish: async (parent, args) => {
    return await Publish.find({ name: { $regex: args.name } });
  },

  filterBook: async (parent, args) => {
    if (args?.publishName != undefined) {
      console.log(args?.publishName);
      return await Publish.find({ name: { $regex: args.publishName } });
    }

    if (args?.authorName != undefined) {
      console.log(args.authorName);
      return await Author.find({ name: { $regex: args.authorName } });
    }

    return [];
  },
};
