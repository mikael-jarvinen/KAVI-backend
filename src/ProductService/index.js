const getProducts = require('../AlkostoreAPI/getProducts')
let data = require('./products.json')
const fs = require('fs')
const uuid = require('uuid/v1')

const writeToFile = () => {
  fs.writeFileSync('src/ProductService/products.json', JSON.stringify(data), 'utf-8')
}

const setComments = (newProducts, products) => {
  newProducts = newProducts.map(newProduct => {
    const oldProduct = products
      .find(product => product.name === newProduct.name)
    if(!oldProduct) {
      return {
        id: uuid(),
        ...newProduct,
        comments: []
      }
    }
    return {
      id: oldProduct.id,
      ...newProduct,
      comments: oldProduct.comments
    }
  })
  return newProducts
}

const addComment = (target, comment) => {
  let newProducts = data
  for (const key in data) {
    let product = data[key].find(p => p.id === target)
    if (!product) {
      continue
    }
    product.comments.push(comment)
    newProducts[key] = newProducts[key].map(p => {
      if (p.id === target) {
        return product
      }
      return p
    })
    newProducts[key].push(product)
    data = newProducts
    writeToFile()
    return product
  }
}

const findById = (id) => {
  for (const key in data) {
    const productList = data[key]
    const product = productList.find(p => p.id === id)
    if(product) {
      return product
    }
  }
}

getProducts()
  .then(result => {
    result.beers = setComments(result.beers, data.beers)
    result.boxWines = setComments(result.boxWines, data.boxWines)
    result.ciders = setComments(result.ciders, data.boxWines)
    result.effervescents = setComments(result.effervescents, data.effervescents)
    result.spirits = setComments(result.spirits, data.spirits)
    result.veganWines = setComments(result.veganWines, data.veganWines)
    result.wines = setComments(result.wines, data.wines)

    data = result
    writeToFile()
    console.log('Products refreshed')
  })

const products = () => {
  return data
}

module.exports = {
  products,
  addComment,
  findById
}