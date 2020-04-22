const { ApolloServer, gql } = require('apollo-server')
const { products, addComment, findById } = require('./ProductService')

const typeDefs = gql`
  type Query {
    allBeers: [Product!]!
    allCiders: [Product!]!
    allSpirits: [Product!]!
    allEffervescents: [Product!]!
    allBoxWines: [Product!]!
    allWines: [Product!]!
    allVeganWines: [Product!]!
    product(id: ID!): Product!
  }

  type Comment {
    date: String!
    author: String!
    message: String!
  }

  type Product {
    id: ID!
    name: String!
    price: String!
    postage: String!
    volume: String!
    vol: String!
    KAVI: String!
    url: String!
    comments: [Comment!]!
  }

  type Mutation {
    addComment(
      id: ID!
      author: String!
      message: String!
    ): Product
  }
`

const resolvers = {
  Query: {
    allBeers: () => products().beers,
    allCiders: () => products().ciders,
    allSpirits: () => products().spirits,
    allEffervescents: () => products().effervescents,
    allBoxWines: () => products().boxWines,
    allWines: () => products().wines,
    allVeganWines: () => products().veganWines,
    product: (root, args) => findById(args.id)
  },
  Mutation: {
    addComment: (root, args) => addComment(args.id, {
      date: new Date(),
      author: args.author,
      message: args.message
    })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})