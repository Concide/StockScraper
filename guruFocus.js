const rp = require("request-promise")
const $ = require("cheerio")

const removeLastSign = string => {
  if (string[string.length - 1] === "%") {
    return string.substring(0, string.length - 1)
  }
}

const parse = html => {
  const divIncYearsSelector = $(".info", html)
  const divIncYears = divIncYearsSelector[0].children[0].data
  const divSinceYear = divIncYears.substring(
    divIncYears.length - 4,
    divIncYears.length
  )
  const divIncreaseStreak = new Date().getFullYear() - divSinceYear

  const payoutRatio =
    removeLastSign($(".login_box", html)[1].children[1].children[0].data) / 100

  const dividendsRow = $(".R10 tbody tr td", html)

  const cagr1Y = removeLastSign(dividendsRow[0].children[0].data) / 100
  const cagr3Y = removeLastSign(dividendsRow[2].children[0].data) / 100
  const cagr5Y = removeLastSign(dividendsRow[4].children[0].data) / 100
  const cagr10Y = removeLastSign(dividendsRow[6].children[0].data) / 100
  const yoc1Y = removeLastSign(dividendsRow[1].children[0].data) / 100
  const yoc3Y = removeLastSign(dividendsRow[3].children[0].data) / 100
  const yoc5Y = removeLastSign(dividendsRow[5].children[0].data) / 100
  const yoc10Y = removeLastSign(dividendsRow[7].children[0].data) / 100

  return {
    divSinceYear,
    divIncreaseStreak,
    payoutRatio,
    cagr1Y,
    cagr3Y,
    cagr5Y,
    cagr10Y,
    yoc1Y,
    yoc3Y,
    yoc5Y,
    yoc10Y
  }
}

module.exports = async ticker =>
  rp(`https://www.gurufocus.com/dividend/${ticker}`)
    .then(async html => await parse(html))
    .catch(err => err)
