const { calculateFairPrice } = require("../utils/stockHelpers")

module.exports = ({ finviz, iextrading }) => {
  return {
    change1dPercent: iextrading.quote.changePercent,
    change5dPercent: iextrading.stock.day5ChangePercent,
    change1mPercent: iextrading.stock.month1ChangePercent,
    change3mPercent: iextrading.stock.month3ChangePercent,
    change6mPercent: iextrading.stock.month6ChangePercent,
    changeytdPercent: iextrading.stock.ytdChangePercent,
    change1yPercent: iextrading.stock.year1ChangePercent,
    change2yPercent: iextrading.stock.year2ChangePercent,
    change5yPercent: iextrading.stock.year5ChangePercent,
    day50MovingAvg: iextrading.stock.day50MovingAvg,
    day200MovingAvg: iextrading.stock.day200MovingAvg,
    marketCap: iextrading.stock.marketcap,
    price: iextrading.price,
    priceTarget: iextrading.priceTarget.priceTargetAverage,
    priceTargetHigh: iextrading.priceTarget.priceTargetHigh,
    priceTargetLow: iextrading.priceTarget.priceTargetLow,
    priceTargetPercent: calculateFairPrice(
      iextrading.priceTarget.priceTargetAverage,
      iextrading.price
    ),
    yearLow: iextrading.stock.week52low,
    yearHigh: iextrading.stock.week52high,
    yearLowPercent: finviz.yearLow["52W Low"],
    yearHighPercent: finviz.yearHigh["52W High"]
  }
}
