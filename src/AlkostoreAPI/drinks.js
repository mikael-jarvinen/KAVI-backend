const scrapers = require('./scrapers')

const getDrinks = async (page, url) => {
  await page.goto(url, { waitUntil: 'networkidle2' })

  let drinks = []
  do {
    const result = await scrapers.pageScrape(page)
    drinks = drinks.concat(...result)
  }
  while (await scrapers.nextPage(page))

  return drinks
}

module.exports = getDrinks
