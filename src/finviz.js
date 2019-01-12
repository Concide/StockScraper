const rp = require("request-promise")
const $ = require("cheerio")

const getData = node => {
  if (node.children) {
    return getData(node.children[0])
  }
  return node.data
}

const parse = html => {
  const table = $(".snapshot-table2 td", html)

  const getStat = index => {
    const name = table[index].children[0].data
    let value = getData(table[index + 1])

    if (value[value.length - 1] === "%")
      value = value.substring(0, value.length - 1) / 100
    if (value.length === 1 && value[0] === "-") value = false

    return { [name]: value }
  }

  const pe = getStat(2)
  const epsTTM = getStat(4)
  const forwardPE = getStat(14)
  const income = getStat(24)
  const peg = getStat(26)
  const epsNextQuarter = getStat(28)
  const institOwn = getStat(30)
  const sales = getStat(36)
  const ps = getStat(38)
  const epsThisYear = getStat(40)
  const bookPerShare = getStat(48)
  const pb = getStat(50)
  const epsGrowthNextYear = getStat(52)
  const roa = getStat(54)
  const targetPrice = getStat(56)
  const cashPerShare = getStat(60)
  const pc = getStat(62)
  const epsNext5Y = getStat(64)
  const roe = getStat(66)
  const dividend = getStat(72)
  const pfcf = getStat(74)
  const epsPast5Y = getStat(76)
  const roi = getStat(78)
  const yearHigh = getStat(80)
  const beta = getStat(82)
  const dividendPercent = getStat(84)
  const salesGrowthPast5Y = getStat(88)
  const grossMargin = getStat(90)
  const yearLow = getStat(92)
  const salesQQ = getStat(100)
  const operMargin = getStat(102)
  const debtToEq = getStat(110)
  const epsQQ = getStat(112)
  const profitMargin = getStat(114)
  const ltDebtToEq = getStat(122)
  const recommendation = getStat(132)

  return {
    ...pe,
    ...forwardPE,
    ...epsTTM,
    ...epsNextQuarter,
    ...epsThisYear,
    ...epsGrowthNextYear,
    ...epsNext5Y,
    ...epsPast5Y,
    ...epsQQ,
    ...salesGrowthPast5Y,
    ...salesQQ,
    ...income,
    ...sales,
    ...peg,
    ...ps,
    ...pb,
    ...pc,
    ...pfcf,
    ...grossMargin,
    ...operMargin,
    ...profitMargin,
    ...bookPerShare,
    ...cashPerShare,
    ...roa,
    ...roe,
    ...roi,
    ...debtToEq,
    ...ltDebtToEq,
    ...institOwn,
    ...yearLow,
    ...yearHigh,
    ...dividend,
    ...dividendPercent,
    ...beta,
    ...targetPrice,
    ...recommendation
  }
}

module.exports = async ticker =>
  rp(`https://www.finviz.com/quote.ashx?t=${ticker}&ty=c&p=d&b=1`)
    .then(async html => await parse(html))
    .catch(err => err)
