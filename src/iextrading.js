const fetch = require("node-fetch")

const getData = async ticker => {
  try {
    const api = [
      [
        "dividendsHistory",
        `https://api.iextrading.com/1.0/stock/${ticker}/dividends/5y`
      ],
      ["logo", `https://api.iextrading.com/1.0/stock/${ticker}/logo`],
      ["company", `https://api.iextrading.com/1.0/stock/${ticker}/company`],
      ["stock", `https://api.iextrading.com/1.0/stock/${ticker}/stats`],
      ["quote", `https://api.iextrading.com/1.0/stock/${ticker}/quote`],
      ["price", `https://api.iextrading.com/1.0/stock/${ticker}/price`],
      ["news", `https://api.iextrading.com/1.0/stock/${ticker}/news`],
      ["peers", `https://api.iextrading.com/1.0/stock/${ticker}/peers`],
      ["splits", `https://api.iextrading.com/1.0/stock/${ticker}/splits/5y`],
      ["earnings", `https://api.iextrading.com/1.0/stock/${ticker}/earnings`],
      [
        "financialsQuarter",
        `https://api.iextrading.com/1.0/stock/${ticker}/financials`
      ],
      [
        "financialsYear",
        `https://api.iextrading.com/1.0/stock/${ticker}/financials?period=annual`
      ],
      ["chart1d", `https://api.iextrading.com/1.0/stock/${ticker}/chart/1d`],
      ["chart5y", `https://api.iextrading.com/1.0/stock/${ticker}/chart/5y`]
    ]

    const labels = api.map(url => url[0])
    const urls = api.map(url => url[1])

    const fetchedData = await Promise.all(urls.map(url => fetch(url)))
    const parsedData = await Promise.all(fetchedData.map(item => item.json()))

    const data = parsedData
      .map((data, index) => ({
        id: labels[index],
        data
      }))
      .reduce((obj, item) => {
        obj[item.id] = item.data
        return obj
      }, {})

    return {
      data: {
        dividendsHistory: data.dividendsHistory,
        splits: data.splits,
        logo: data.logo.url,
        company: data.company.companyName,
        marketCap: data.quote.marketCap,
        sector: data.company.sector,
        industry: data.company.industry,
        tags: data.company.tags,
        website: data.company.website,
        description: data.company.description,
        CEO: data.company.CEO,
        week52low: data.stock.week52low,
        week52high: data.stock.week52high,
        y5changePercent: data.stock.year5ChangePercent,
        y2changePercent: data.stock.year2ChangePercent,
        y1changePercent: data.stock.year1ChangePercent,
        ytdchangePercent: data.stock.ytdChangePercent,
        m6changePercent: data.stock.month6ChangePercent,
        m3changePercent: data.stock.month3ChangePercent,
        m1changePercent: data.stock.month1ChangePercent,
        d30changePercent: data.stock.day30ChangePercent,
        d5changePercent: data.stock.day5ChangePercent,
        todayChangePercent: data.quote.changePercent,
        exDividendDate: data.stock.exDividendDate,
        price: data.price,
        news: data.news,
        peers: data.peers,
        earnings: data.earnings.earnings,
        financialsQuarter: data.financialsQuarter.financials,
        financialsYear: data.financialsYear.financials
      },
      charts: {
        chartMinuteLastDay: data.chart1d,
        chartDailyLast5Years: data.chart5y
      }
    }
  } catch (err) {
    return { error: "Ticker not found", message: "Ticker not found" }
  }
}

module.exports = getData
