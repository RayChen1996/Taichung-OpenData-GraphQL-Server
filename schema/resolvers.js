const Book = require("../models/book");
const Author = require("../models/author");
const Publish = require("../models/publish");

const resolvers = {
  Query: {
    authors: async () => {
      return await Author.find({});
    },

    author: async (parent, args) => {
      console.log(args.name);
      return await Author.find({ name: { $regex: args.name } });
    },

    books: async () => {
      const Books = await Book.find({});
      if (Books) return { books: Books };

      return { message: "Error happen!!!" };
    },

    book: async (parent, args) => {
      return await Book.find({ name: { $regex: args.name } });
    },

    publishs: async () => {
      return await Publish.find({});
    },

    publish: async (parent, args) => {
      conosle.log(parent);
      return await Publish.find({ name: { $regex: args.name } });
    },
  },

  Author: {
    //作者寫過幾本書
    books: async (parent, args) => {
      const { _id } = parent;
      return await Book.find({ authorId: _id.toString() });
    },
  },

  Book: {
    //書的作者是誰
    author: async (parent, args) => {
      const { authorId } = parent;
      return await Author.find({ _id: authorId.toString() });
    },
    publish: async (parent, args) => {
      const { publishId } = parent;
      return await Publish.find({ _id: publishId.toString() });
    },
  },

  Publish: {
    //出版社出過的書
    books: async (parent, args) => {
      const { _id } = parent;
      return await Book.find({ publishId: _id.toString() });
    },
  },

  BooksResult: {
    __resolveType(obj) {
      console.log(obj);
      if (obj.books) return "BooksSuccessResult";

      if (obj.message) return "BooksErrorResult";

      return null;
    },
  },

  Mutation: {
    createAuthor: (parent, args) => {
      let author = new Author({
        name: args.input.name,
      });
      return author.save();
    },
    createBook: (parent, args) => {
      let book = new Book({
        name: args.input.name,
        publishId: args.input.publishId,
        authorId: args.input.authorId,
      });
      return book.save();
    },

    createPublish: (parent, args) => {
      let publish = new Publish({
        name: args.input,
      });
      return publish.save();
    },

    updateBook: async (parent, args) => {
      await Book.updateOne(
        { name: args.input },
        { $set: { publish: "6191de684c9eef964dd8fb13" } }
      );
      return await Book.findOne({ name: args.input });
    },
  },
};

module.exports = resolvers;
