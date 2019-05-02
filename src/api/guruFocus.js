const puppeteer = require("puppeteer")
const $ = require("cheerio")
const { reduceToObject } = require("../utils")

/* Creates Browser and waits for render because GuruFocus recently moved to Single Page App. Returns .dividends block */
const createHTML = async ticker => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`https://www.gurufocus.com/stock/${ticker}/dividend`)
  await page.waitForSelector(".dividends .el-row", { timeout: 15000 })

  return await page.evaluate(
    () => document.querySelector(".dividends").innerHTML
  )
}

const parse = html => {
  try {
    const rowDataSelector = Object.values($("div.el-row", html))

    const tableSelector = $(".el-card__body table tr", html)

    const data = {
      labels: tableSelector[0].children
        .filter(obj => obj.name)
        .map(obj => obj.children[0].data),
      data: tableSelector[1].children
        .filter(obj => obj.name)
        .map(obj => obj.children[0].data)
    }

    return {
      ...reduceToObject(data),
      buybackRatio: rowDataSelector[9].children[0].data,
      payoutRatio: rowDataSelector[3].children[0].data
    }
  } catch (err) {
    return null
  }
}

module.exports = async ticker =>
  createHTML(ticker)
    .then(html => parse(html))
    .catch(err => err)
