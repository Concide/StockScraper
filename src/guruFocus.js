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
  const divSinceYear = Number(
    divIncYears.substring(divIncYears.length - 4, divIncYears.length)
  )
  const divIncreaseStreak = new Date().getFullYear() - divSinceYear

  const payoutRatioPercent =
    removeLastSign($(".login_box", html)[1].children[1].children[0].data) / 100

  const dividendsRow = $(".R10 tbody tr td", html)

  const cagr1YPercent = removeLastSign(dividendsRow[0].children[0].data) / 100
  const cagr3YPercent = removeLastSign(dividendsRow[2].children[0].data) / 100
  const cagr5YPercent = removeLastSign(dividendsRow[4].children[0].data) / 100
  const cagr10YPercent = removeLastSign(dividendsRow[6].children[0].data) / 100
  const yoc1YPercent = removeLastSign(dividendsRow[1].children[0].data) / 100
  const yoc3YPercent = removeLastSign(dividendsRow[3].children[0].data) / 100
  const yoc5YPercent = removeLastSign(dividendsRow[5].children[0].data) / 100
  const yoc10YPercent = removeLastSign(dividendsRow[7].children[0].data) / 100

  return {
    divSinceYear,
    divIncreaseStreak,
    payoutRatioPercent,
    cagr1YPercent,
    cagr3YPercent,
    cagr5YPercent,
    cagr10YPercent,
    yoc1YPercent,
    yoc3YPercent,
    yoc5YPercent,
    yoc10YPercent
  }
}

module.exports = async ticker =>
  rp(`https://www.gurufocus.com/dividend/${ticker}`)
    .then(async html => await parse(html))
    .catch(err => err)
