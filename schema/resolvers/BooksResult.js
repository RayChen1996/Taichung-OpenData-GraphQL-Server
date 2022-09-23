exports.BooksResult = {
  __resolveType(obj) {
    if (obj.books) return "BooksSuccessResult";

    if (obj.message) return "BooksErrorResult";

    return null;
  },
};
