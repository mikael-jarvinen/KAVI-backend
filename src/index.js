const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const express = require('express')  //Express is used for static fileserving
const app = express()
const path = require('path')

const PORT = process.env.PORT

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.use(express.static('build'))
app.use(express.json())

//Route for handling requests made with the kavi-extension
app.post('/drive', ({ body }, res) => {
  if (!body.product || !body.price || !body.postage) {
    return res.status(500).send({ error: 'Missing product fields' })
  }
  return res.send(`name: ${body.product}, price: ${body.price}, postage: ${body.postage}`)
})

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