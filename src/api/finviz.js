const rp = require("request-promise")
const $ = require("cheerio")
const { checkValue, getNode } = require("../utils")

const parse = html => {
  const table = $(".snapshot-table2 td", html)

  const country =
    $("td .fullview-links", html)[1].children[4].children[0].data || null

  const getStat = index => {
    const name = table[index].children[0].data
    const value = getNode(table[index + 1])

    return { [name]: checkValue(value) }
  }

  return {
    pe: getStat(2),
    epsTTM: getStat(4),
    forwardPE: getStat(14),
    income: getStat(24),
    epsNextQuarter: getStat(28),
    institOwn: getStat(30),
    sales: getStat(36),
    ps: getStat(38),
    epsThisYear: getStat(40),
    bookPerShare: getStat(48),
    pb: getStat(50),
    epsGrowthNextYear: getStat(52),
    roa: getStat(54),
    cashPerShare: getStat(60),
    pc: getStat(62),
    epsNext5Y: getStat(64),
    roe: getStat(66),
    dividend: getStat(72),
    pfcf: getStat(74),
    epsPast5Y: getStat(76),
    roi: getStat(78),
    yearHigh: getStat(80),
    beta: getStat(82),
    dividendPercent: getStat(84),
    salesGrowthPast5Y: getStat(88),
    grossMargin: getStat(90),
    yearLow: getStat(92),
    salesQQ: getStat(100),
    operMargin: getStat(102),
    debtToEq: getStat(110),
    epsQQ: getStat(112),
    profitMargin: getStat(114),
    ltDebtToEq: getStat(122),
    recommendation: getStat(132),
    country
  }
}

module.exports = async ticker =>
  rp(`https://www.finviz.com/quote.ashx?t=${ticker}&ty=c&p=d&b=1`)
    .then(async html => await parse(html))
    .catch(err => err)
