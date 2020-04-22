const puppeteer = require('puppeteer')
const getDrinks = require('./drinks')

const beerUrl = 'https://alkostore24.com/fi/bier.html'
const ciderUrl = 'https://alkostore24.com/fi/cider.html'
const spiritUrl = 'https://alkostore24.com/fi/spirituosen.html'
const effervescentUrl = 'https://alkostore24.com/fi/schaumweine.html'
const boxWineUrl = 'https://alkostore24.com/fi/bag-in-box-weine.html'
const wineUrl = 'https://alkostore24.com/fi/weine.html'
const veganWineUrl = 'https://alkostore24.com/fi/bio-weine.html'

const scrape = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const beer = await getDrinks(page, beerUrl)
  const cider = await getDrinks(page, ciderUrl)
  const spirit = await getDrinks(page, spiritUrl)
  const effervescent = await getDrinks(page, effervescentUrl)
  const boxWine = await getDrinks(page, boxWineUrl)
  const wine = await getDrinks(page, wineUrl)
  const veganWine = await getDrinks(page, veganWineUrl)

  const all = {
    beers: [
      ...beer
    ],
    ciders: [
      ...cider
    ],
    spirits: [
      ...spirit
    ],
    effervescents: [
      ...effervescent
    ],
    boxWines: [
      ...boxWine
    ],
    wines: [
      ...wine
    ],
    veganWines: [
      ...veganWine
    ]
  }
  browser.close()

  return all
}

module.exports = scrape