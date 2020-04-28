const { products, addComment, findById } = require('./ProductService')

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

module.exports = resolvers