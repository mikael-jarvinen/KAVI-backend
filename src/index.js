const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const express = require('express')  //Express is used for static fileserving
const app = express()
const path = require('path')
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'), err => {
    if (err) {
      res.status(500).send(err)
      console.log(err)
    }
  })
})

app.listen({ port: PORT}, () => {
  console.log(`Apollo server ready at http://localhost:${PORT}${server.graphqlPath}`)
})