import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v1 as uuidv1 } from 'uuid'


let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]

const typeDefs = `#graphql
  type Address {
    street: String!
    city: String! 
  } 
  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
  enum YesNo {
    YES
    NO
  }
  type Query {
    personCount: Int
    allPersons(phone:YesNo): [Person]
    findPerson(name: String!): Person
  }
  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`
const resolvers = {
  Query: {
    personCount: ()=>persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return persons
      }
      const byPhone = (person) =>
        args.phone === 'YES' ? person.phone : !person.phone
      return persons.filter(byPhone)
    },
    findPerson: (root, args) => {
      return persons.find(i=>i.name===args.name)
    }
  },
  Person: {
    address: (root)=>{
      return {
        street: root.street,
        city: root.city
      }
    }
  },
  Mutation: {
    addPerson: (root, args)=> {
      if (persons.find(p => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }
      const person = {...args, id: uuidv1()}
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args)=> {
      let person = persons.find(i=>i.name===args.name)
      if (!person) {
        return null
      }
      const newEntry = {...person, phone: args.phone}
      persons = persons.map(i=>i.name===args.name?newEntry:i)
      return newEntry
    }
  },
}


const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);

