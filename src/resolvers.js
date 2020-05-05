const { products, addComment, findById } = require('./ProductService')
const { postOrder } = require('./sheetsApi')

const resolvers = {
  Query: {
    allBeers: () => products().beers,
    allCiders: () => products().ciders,
    allSpirits: () => products().spirits,
    allEffervescents: () => products().effervescents,
    allBoxWines: () => products().boxWines,
    allWines: () => products().wines,
    allVeganWines: () => products().veganWines,
    product: (root, args) => findById(args.id),
    searchProducts: (root, args) => {
      const data = products()
      const allProducts = [
        ...data.beers,
        ...data.ciders,
        ...data.spirits,
        ...data.effervescents,
        ...data.boxWines,
        ...data.wines,
        ...data.veganWines
      ]

      const filteredProducts = allProducts.filter(p => 
        p.name.toLowerCase().includes(args.search.toLowerCase()))
      return filteredProducts
    }
  },
  Mutation: {
    addComment: (root, args) => addComment(args.id, {
      date: new Date().toString(),
      author: args.author,
      message: args.message
    }),
    addOrder: (root, args) => {
      try {
        postOrder(
          args.author,
          args.product,
          args.price,
          args.postage
        )
        return true
      } catch (e) {
        return false
      }
    }
  }
}

module.exports = resolvers