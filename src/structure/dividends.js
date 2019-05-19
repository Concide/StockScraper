const { checkValue } = require("../utils")
const {
  calculateChowderRatio,
  calculatePeToChowderRatio
} = require("../utils/stockHelpers")
const { projectDividendIncome } = require("../utils/projectDividendIncome")

module.exports = ({ finviz, gurufocus, iextrading }) => {
  if (!gurufocus) return null

  const data = {
    buybackPercent: checkValue(gurufocus.buybackRatio),
    dividendYieldPercent: checkValue(finviz.dividendPercent["Dividend %"]),
    dividend: checkValue(finviz.dividend["Dividend"]),
    exDividendDate: iextrading.stock.exDividendDate,
    growthRatePercent1y: checkValue(gurufocus["Growth Rate (1-year)"]),
    growthRatePercent3y: checkValue(gurufocus["Growth Rate (3-year)"]),
    growthRatePercent5y: checkValue(gurufocus["Growth Rate (5-year)"]),
    growthRatePercent10y: checkValue(gurufocus["Growth Rate (10-year)"]),
    history: iextrading.dividendsHistory,
    payoutRatioPercent: checkValue(gurufocus.payoutRatio),
    yieldOnCost1yPercent: checkValue(gurufocus["Yield on Cost (1-year)"]),
    yieldOnCost3yPercent: checkValue(gurufocus["Yield on Cost (3-year)"]),
    yieldOnCost5yPercent: checkValue(gurufocus["Yield on Cost (5-year)"]),
    yieldOnCost10yPercent: checkValue(gurufocus["Yield on Cost (10-year)"])
  }

  const divData = {
    div: data.dividendYieldPercent,
    divGr:
      data.growthRatePercent5y ||
      data.growthRatePercent3y ||
      data.growthRatePercent1y
  }

  return {
    ...data,
    chowderRatio: calculateChowderRatio(divData),
    peToChowderRatio: calculatePeToChowderRatio(finviz.pe["P/E"], divData),
    projectedDividendReinvestmentHistory: projectDividendIncome(
      data.dividend,
      divData.divGr,
      iextrading.price,
      0.1,
      20,
      10000,
      true
    )
  }
}
