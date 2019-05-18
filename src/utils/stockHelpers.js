const { checkValue } = require("./index")

const calculateAdjustedPeg = finviz => {
  const data = {
    dividendYield: checkValue(finviz.dividendPercent["Dividend %"] || 0),
    epsGrowth: finviz.epsNext5Y["EPS next 5Y"],
    pe: finviz.pe["P/E"] / 100
  }
  if (data.pe && data.epsGrowth && data.dividendYield) {
    return Number((data.pe / (data.dividendYield + data.epsGrowth)).toFixed(3))
  }

  return null
}

const calculateDivGrowthAdjustedPeg = (finviz, gurufocus) => {
  if (gurufocus) {
    const divData = {
      growthRatePercent1y: checkValue(gurufocus["Growth Rate (1-year)"]),
      growthRatePercent3y: checkValue(gurufocus["Growth Rate (3-year)"]),
      growthRatePercent5y: checkValue(gurufocus["Growth Rate (5-year)"]),
      dividendYield: checkValue(finviz.dividendPercent["Dividend %"]),
      epsGrowth: finviz.epsNext5Y["EPS next 5Y"],
      pe: finviz.pe["P/E"] / 100
    }

    const growthRate =
      divData.growthRatePercent5y ||
      divData.growthRatePercent3y ||
      divData.growthRatePercent1y

    if (!growthRate) return null

    const div = divData.dividendYield * (1 + growthRate)

    return Number((divData.pe / (div + divData.epsGrowth)).toFixed(3))
  }
  return null
}

const calculateFairPrice = (targetPrice, price) =>
  Number((targetPrice / price - 1).toFixed(3))

const calculatePeg = finviz =>
  Number((finviz.pe["P/E"] / 100 / finviz.epsNext5Y["EPS next 5Y"]).toFixed(3))

const calculateChowderRatio = ({ div, divGr }) => Number((div + divGr) * 100)

module.exports = {
  calculateAdjustedPeg,
  calculateChowderRatio,
  calculateDivGrowthAdjustedPeg,
  calculateFairPrice,
  calculatePeg
}
