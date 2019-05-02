const dividends = require("./dividends")
const financials = require("./financials")
const other = require("./other")
const price = require("./price")
const ratios = require("./ratios")

module.exports = {
  buildDividendsData: dividends,
  buildFinancialsData: financials,
  buildOtherData: other,
  buildPriceData: price,
  buildRatiosData: ratios
}
