const { ApolloServer, gql } = require("apollo-server");
const { Query } = require("./schema/resolvers/Query");
const { Mutation } = require("./schema/resolvers/Mutation");
const { Author } = require("./schema/resolvers/Author");
const { Book } = require("./schema/resolvers/Book");
const { Publish } = require("./schema/resolvers/Publish");
const { BooksResult } = require("./schema/resolvers/BooksResult");
const { FilterBook } = require("./schema/resolvers/FilterBook");
const mongoose = require("mongoose");
// const typeDefs = require("./schema/type");
// const mongoose = require("mongoose");
require("dotenv").config();
const uri =
  "mongodb+srv://ray10315332:GayqbQeJq5Jxh3em@cluster0.pberq7k.mongodb.net/";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mogoose connect!!!");
});
const User = mongoose.model('User', {
  email: String,
  password: String,
});
// 定义GraphQL Schema
const typeDefs = gql`
  type Todo {
    id: ID!
    task: String!
    completed: Boolean!
  }

 

 
  type User {
      id: ID!
      email: String!
    }

    type AuthPayload {
      token: String!
    }

    type Query {
      users: [User]
      todos: [Todo]
    todo(id: ID!): Todo
    }

    type Mutation {
      register(email: String!, password: String!): AuthPayload
      login(email: String!, password: String!): AuthPayload
      addTodo(task: String!): Todo
    updateTodo(id: ID!, task: String!, completed: Boolean!): Todo
    deleteTodo(id: ID!): Todo
    }



`;

// 4. 提供解析函数
const resolvers = {
  Query: {
    users: () => User.find(),
    todos: async () => {
      const todos = await Todo.find();
      return todos;
    },
    todo: async (_, { id }) => {
      const todo = await Todo.findById(id);
      return todo;
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '7d' });

      return { token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid login credentials');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid login credentials');
      }

      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '7d' });

      return { token };
    },
    addTodo: async (_, { task }) => {
      const todo = new Todo({ task, completed: false });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, task, completed }) => {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { task, completed },
        { new: true }
      );
      return todo;
    },
    deleteTodo: async (_, { id }) => {
      const todo = await Todo.findByIdAndDelete(id);
      return todo;
    },
  },
};

// 5. 连接到 MongoDB 数据库
mongoose.connect(
  "mongodb+srv://ray10315332:GayqbQeJq5Jxh3em@cluster0.pberq7k.mongodb.net/",
  {
    useUnifiedTopology: true,
  }
);

// 6. 定义 Todo 模型
const Todo = mongoose.model("Todo", {
  task: String,
  completed: Boolean,
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // resolvers: {
  //   Query,
  //   Mutation,
  //   Author,
  //   Book,
  //   Publish,
  //   FilterBook,
  //   BooksResult,
  // },
  persistedQueries: false,
  playground: true,
});

// const app = express();
// const port = 8080;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.get("/hello", (req, res) => {
//   res.json({
//     message: "Hello",
//   });
// });

// app.listen(3000, () => {
//   console.log(`Express Server started on port ${port}`);
// });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is ${url}`);
});
