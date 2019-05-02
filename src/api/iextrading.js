const fetch = require("node-fetch")
const { filterData, getAccess, reduceToObject } = require("../utils")

const getAPIObject = async ({ ticker, token, settings }) => {
  const {
    chart,
    company,
    dividends,
    news,
    other,
    peers,
    recommendationTrends
  } = settings

  const api = {
    chart: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5y?token=${token}&chartCloseOnly=true`,
    company: `https://cloud.iexapis.com/stable/stock/${ticker}/company?token=${token}`,
    dividendsHistory: `https://cloud.iexapis.com/stable/stock/${ticker}/dividends/5y?token=${token}`,
    logo: `https://cloud.iexapis.com/stable/stock/${ticker}/logo?token=${token}`,
    news: `https://cloud.iexapis.com/stable/stock/${ticker}/news?token=${token}`,
    peers: `https://cloud.iexapis.com/stable/stock/${ticker}/peers?token=${token}`,
    price: `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${token}`,
    priceTarget: `https://cloud.iexapis.com/stable/stock/${ticker}/price-target?token=${token}`,
    quote: `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${token}`,
    recommendationTrends: `https://cloud.iexapis.com/stable/stock/${ticker}/recommendation-trends?token=${token}`,
    stock: `https://cloud.iexapis.com/stable/stock/${ticker}/stats?token=${token}`
  }

  const requests = {
    chart: getAccess(chart, api.chart),
    company: getAccess(company, api.company),
    dividendsHistory: getAccess(dividends, api.dividendsHistory),
    logo: getAccess(other, api.logo),
    news: getAccess(news, api.news),
    peers: getAccess(peers, api.peers),
    price: api.price,
    priceTarget: api.priceTarget,
    quote: api.quote,
    recommendationTrends: getAccess(
      recommendationTrends,
      api.recommendationTrends
    ),
    stock: api.stock
  }

  return filterData(requests)
}

module.exports = async ({ ticker, token, settings }) => {
  try {
    const api = await getAPIObject({ ticker, token, settings })

    const data = await Promise.all(
      Object.values(api).map(url => fetch(url))
    ).then(async data => await Promise.all(data.map(item => item.json())))

    return reduceToObject({ labels: Object.keys(api), data })
  } catch (err) {
    return null
  }
}
