const productToString = product => {
  return {
    name: product.name.toString(),
    price: product.price,
    postage: product.postage,
    volume: product.volume,
    vol: product.vol,
    KAVI: product.KAVI,
    url: product.url.toString(),
    comments: product.comments.map(comment => {
      return {
        date: comment.date,
        author: comment.author,
        message: comment.message
      }
    })
  }
}

module.exports = {
  productToString
}