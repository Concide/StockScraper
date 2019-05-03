const company = require("./company")
const dividends = require("./dividends")
const financials = require("./financials")
const other = require("./other")
const price = require("./price")
const ratios = require("./ratios")

module.exports = {
  buildCompanyData: company,
  buildDividendsData: dividends,
  buildFinancialsData: financials,
  buildOtherData: other,
  buildPriceData: price,
  buildRatiosData: ratios
}
