const {
  buildCompanyData,
  buildDividendsData,
  buildFinancialsData,
  buildOtherData,
  buildPriceData,
  buildRatiosData
} = require("../structure")
const { filterData, getAccess } = require("./index")

const buildData = (ticker, { finviz, gurufocus, iextrading }, settings) => {
  const data = {
    id: getAccess(settings.id, ticker),
    ticker: getAccess(settings.ticker, ticker.toUpperCase()),
    chart: getAccess(settings.chart, iextrading.chart),
    company: getAccess(
      settings.company,
      buildCompanyData({ finviz, iextrading })
    ),
    dividends: getAccess(
      settings.dividends,
      buildDividendsData({ finviz, gurufocus, iextrading })
    ),
    financials: getAccess(
      settings.financials,
      buildFinancialsData({ finviz, iextrading })
    ),
    news: getAccess(settings.news, iextrading.news),
    other: getAccess(settings.other, buildOtherData({ finviz, iextrading })),
    peers: getAccess(settings.peers, iextrading.peers),
    price: buildPriceData({ finviz, iextrading }),
    ratios: buildRatiosData({ finviz, gurufocus }),
    recommendationTrends: getAccess(
      settings.recommendationTrends,
      iextrading.recommendationTrends
    )
  }

  return filterData(data)
}

module.exports = (ticker, data, settings) => buildData(ticker, data, settings)
