const pageScrape = async page => {
  return await await page.evaluate(() => {
    const rows = document
      .querySelectorAll('.products-grid.row')
    let listItems = []
    Array.from(rows).forEach(row => {
      const items = row.querySelectorAll('li')
      const array = Array.from(items)
      listItems = listItems.concat(...array)
    })

    listItems = listItems.map(item => {
      const name = item.querySelector('.product-name')
        .innerText
      const price = Number(item.querySelector('.price-box')
        .innerText.slice(0, -2).replace(/[,]/, '.'))
      const volume = Number(item.querySelector('.info.unit')
        .innerText.substring(8).slice(0, -1))
      let tempVol = '0'
      try {
        tempVol = item.querySelector('.info.vol')
          .innerText.substring(4).slice(0, -1)
      } catch (e) {
        tempVol = '0'
      }
      const vol = Number(tempVol.replace(/[,]/, '.'))
      let url = item.querySelector('.product-image')
        .querySelector('a').href

      const img = item.querySelector('img').src
      let postage = 0
      switch (volume) {
      case (12):
        postage = 13
        break
      case (10.56):
	postage = 13
	break
      case (7.92):
        postage = 8.7
        break
      case (5):
        postage = 8.7
        break
      case (3.96):
	postage = 4.34
	break
      case (3):
        postage = 4.34
        break
      default:
        postage = 2.17
        break
      }
      
      const total = price + postage
      const alcVolume = vol / 100 * volume
      const alcLiterPrice = total / alcVolume
      let KAVI = (9 * alcLiterPrice - 130.55) / 55.93
      KAVI = Math.round((KAVI + Number.EPSILON) * 100) / 100
      if(!KAVI || vol === 0) {
        return undefined
      }
      return {
        name,
        price,
        postage,
        volume,
        vol,
        KAVI,
        url,
        img
      }
    })
    return listItems = listItems.filter(item => item !== undefined)
  })
}

const nextPage = async page => {
  try {
    await page.evaluate(() => {
      document.querySelector('.next.i-next').click()
    })
    await page.waitForNavigation()
    return true
  } catch (e) {
    return false
  }
}

module.exports = { pageScrape, nextPage }

