const getKey = (key, object) => {
  const foundKey = Object.keys(object).filter(k => k === key)
  if (foundKey.length > 0) {
    return object[key]
  } else {
    return true
  }
}

module.exports = settings => ({
  id: getKey("id", settings),
  ticker: getKey("ticker", settings),
  chart: getKey("chart", settings),
  company: getKey("company", settings),
  dividends: getKey("dividends", settings),
  financials: getKey("financials", settings),
  news: getKey("news", settings),
  other: getKey("other", settings),
  peers: getKey("peers", settings),
  recommendationTrends: getKey("recommendationTrends", settings)
})
