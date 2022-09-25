const Book = require("../../models/book");
const Author = require("../../models/author");
const Publish = require("../../models/publish");

exports.Mutation = {
  createAuthor: async (parent, args) => {
    const author = await Author.findOne({ name: args.input.name });

    if (author) {
      return author;
    }

    const authorData = new Author({
      name: args.input.name,
      totalBook: 0,
    });
    return authorData.save();
  },

  createPublish: async (parent, args) => {
    const publish = await Publish.findOne({ name: args.input });

    if (publish) {
      return publish;
    }

    const publishData = new Publish({
      name: args.input,
    });
    return publishData.save();
  },

  createBook: (parent, args) => {
    let book = new Book({
      name: args.input.name,
      publishId: args.input.publishId,
      authorId: args.input.authorId,
      ISBN: args.input.ISBN,
      position: "",
      haveImage: "",
    });
    return book.save();
  },

  // updateBook: async (parent, args) => {
  //   await Book.updateOne(
  //     { name: args.input },
  //     { $set: { publish: "6191de684c9eef964dd8fb13" } }
  //   );
  //   return await Book.findOne({ name: args.input });
  // },
  updateBook: async (parent, args) => {
    console.log(args);
    await Book.updateOne(
      { isbn: args.input.ISBN },
      {
        name: args.input.name,
        position: args.input.position,
      }
    );

    return await Book.findOne({ ISBN: args.input.ISBN });
  },
};
