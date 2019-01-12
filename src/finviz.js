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
    pe: pe["P/E"],
    peForward: forwardPE["Forward P/E"],
    epsTTM: epsTTM["EPS (ttm)"],
    epsNextQuarter: epsNextQuarter["EPS next Q"],
    epsThisYearGrowthPercent: epsThisYear["EPS this Y"],
    epsNextYearGrowthPercent: epsGrowthNextYear["EPS next Y"],
    epsNext5YGrowthPercent: epsNext5Y["EPS next 5Y"],
    epsPast5YGrowthPercent: epsPast5Y["EPS past 5Y"],
    epsQQGrowthPercent: epsQQ["EPS Q/Q"],
    salesQQGrowthPercent: salesQQ["Sales Q/Q"],
    salesPast5YGrowthPercent: salesGrowthPast5Y["Sales past 5Y"],
    income: income.Income,
    sales: sales.Sales,
    peg: peg.PEG,
    ps: ps["P/S"],
    pb: pb["P/B"],
    pc: pc["P/C"],
    pfcf: pfcf["P/FCF"],
    grossMarginPercent: grossMargin["Gross Margin"],
    operMarginPercent: operMargin["Oper. Margin"],
    profitMarginPercent: profitMargin["Profit Margin"],
    bookPerShare: bookPerShare["Book/sh"],
    cashPerShare: cashPerShare["Cash/sh"],
    roa: roa.ROA,
    roe: roe.ROE,
    roi: roi.ROI,
    debtToEq: debtToEq["Debt/Eq"],
    ltDebtToEq: ltDebtToEq["LT Debt/Eq"],
    institOwn: institOwn["Inst Own"],
    yearLow: yearLow["52W Low"],
    yearHigh: yearHigh["52W High"],
    dividend: dividend.Dividend,
    dividendPercent: dividendPercent["Dividend %"],
    beta: beta.Beta,
    targetPrice: targetPrice["Target Price"],
    analystRecommendation: recommendation.Recom
  }
}

module.exports = async ticker =>
  rp(`https://www.finviz.com/quote.ashx?t=${ticker}&ty=c&p=d&b=1`)
    .then(async html => await parse(html))
    .catch(err => err)
