const { gql } = require('apollo-server-express')

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
    searchProducts(search: String!): [Product!]!
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
    img: String!
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

module.exports = typeDefs