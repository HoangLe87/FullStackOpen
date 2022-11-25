import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v1 as uuidv1 } from 'uuid';

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: 'Robert Martin',
      id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: 'Robert Martin',
      id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: 'Martin Fowler',
      id: "afa5de00-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: 'Joshua Kerievsky',
      id: "afa5de01-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: 'Sandi Metz',
      id: "afa5de02-344d-11e9-a414-719c6709cf3e",
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: 'Fyodor Dostoevsky',
      id: "afa5de03-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: 'Fyodor Dostoevsky',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ]

  const typeDefs = `#graphql
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre:String, author:String): [Book!]!
    allAuthors: [Author!]
  }
  type Book {
    title: String!
    author: String!
    published: String!
    genres: [String!]!
  }
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }
  type Mutation {
    addBook(
      title:String!
      author:String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor (
      name: String!
      born: Int
    ): [Author]
  }
  `
  

const resolvers = {
  Query: {
    bookCount: ()=>books.length,
    allBooks:(root, args)=>{
      let booksByAuthor=[]
      if (args.author && args.genre) {
        booksByAuthor = books.filter(book=>(book.genres.includes(args.genre)&&(book.author===args.author)))
      } else if (args.author) {
        booksByAuthor = books.filter(book=>(book.author===args.author))
      } else if (args.genre) {
        booksByAuthor = books.filter(book=>(book.genres.includes(args.genre)))
      } else (
        booksByAuthor = [...books]
      )
      let result = booksByAuthor.map(i=>{
        return (
          {
            title:i.title,
            author:i.author
          }
        )
      })
      return result
    },
    authorCount: ()=>authors.length,
    allAuthors: ()=> {
      let result = authors.map(i=>{
        return (
          {
            name:i.name,
            bookCount: (books.filter(book=>book.author===i.name)).length
          }
        )
      })
      return result
    },
  },
  Mutation: {
    addBook: (root, args) => {
      let newBook = {
        title: args.title,
        author: args.author,
        published: args.published,
        genres: args.genres
      }
      books = books.concat(newBook)
      if (authors.find(i=>i.name!==args.author)) {
        let newAuthor = {
          name: args.author,
          id: uuidv1(),
        }
        authors=authors.concat(newAuthor)
      }
      return newBook
    },
    editAuthor: (root, args) => {
      if (authors.find(i=>i.name===args.name)) {
        let newData = authors.find(i=>i.name===args.name)
        newData.born=args.born
        authors = authors.map(x=>x.name!==args.name?x:newData)
        return authors
      } else {
        throw new Error('are you sure the name is correct????')
      }
    }
  }
}


const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);