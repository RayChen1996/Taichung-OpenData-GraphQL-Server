const Author = require("../../models/author");
const Publish = require("../../models/publish");

exports.Book = {
  author: async (parent, args) => {
    const { authorId } = parent;
    return await Author.find({ _id: authorId.toString() });
  },
  publish: async (parent, args) => {
    const { publishId } = parent;
    return await Publish.find({ _id: publishId.toString() });
  },
  authorAndPublish: async (parent, args) => {
    const { publishId, authorId } = parent;
    const publish = await Publish.findOne({ _id: publishId.toString() });
    const author = await Author.findOne({ _id: authorId.toString() });

    return {
      authorName: author.name,
      publishName: publish.name,
    };
  },
};
