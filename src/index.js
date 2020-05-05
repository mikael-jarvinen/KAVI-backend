const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const express = require('express')  //Express is used for static fileserving
const app = express()
const cors = require('cors')

const PORT = process.env.PORT

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.listen({ port: PORT}, () => {
  console.log(`Apollo server ready at http://localhost:${PORT}${server.graphqlPath}`)
})