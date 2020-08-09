const { GoogleSpreadsheet } = require('google-spreadsheet')

const creds = require('../client_secret.json')

const postOrder = async (author, product, price, postage, url) => {
  switch (postage) {
  case '2.17':
    postage = 1
    break
  case '4.34':
    postage = 2
    break
  case '8.7':
    postage = 4
    break
  case '13':
    postage = 6
    break
  }
  const doc = new GoogleSpreadsheet('1efbiqBU_8u-lQ0JQ7X7bvWq69p473h7rS88eHZnMH5k')
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`)
  await sheet.loadCells()
  const subjectCells = [
    sheet.getCell(65, 1),
    sheet.getCell(58, 1),
    sheet.getCell(51, 1),
    sheet.getCell(44, 1),
    sheet.getCell(37, 1),
    sheet.getCell(30, 1),
    sheet.getCell(23, 1),
    sheet.getCell(16, 1),
    sheet.getCell(9, 1),
    sheet.getCell(2, 1),
  ]
  let workingCell = null
  subjectCells.forEach(c => {
    if (c.value === author) {
      workingCell = c
    }
  })
  if (!workingCell) {
    subjectCells.forEach(c => {
      if (!c.value) {
        workingCell = c
      }
    })
  }
  const nameCells = [
    sheet.getCell(workingCell.rowIndex + 6, 1),
    sheet.getCell(workingCell.rowIndex + 5, 1),
    sheet.getCell(workingCell.rowIndex + 4, 1),
    sheet.getCell(workingCell.rowIndex + 3, 1),
    sheet.getCell(workingCell.rowIndex + 2, 1),
    sheet.getCell(workingCell.rowIndex + 1, 1),
  ]
  let nameCell = null
  nameCells.forEach(c => {
    if (!c.value) {
      nameCell = c
    }
  })
  let priceCell = sheet.getCell(nameCell.rowIndex, 2)
  let postageCell = sheet.getCell(nameCell.rowIndex, 3)

  workingCell.value = author
  nameCell.value = `=HYPERLINK("${url}", "${product}")`
  priceCell.value = `="${price}€"`
  postageCell.value = postage

  await sheet.saveUpdatedCells()
}

module.exports = {
  postOrder
}
