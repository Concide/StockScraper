# Stock Scraper

Stock Scraper is a script, that fetches and parses data about stock from :

1. FinViz
2. GuruFocus
3. iexTrading API

## Requirements

In last update iexTrading API became freemium instead of free. So, you need to register on https://iexcloud.io/ to get token.  
Free account offers you 500k monthy. All data about stock - ~4.75k messages. You can turn off chart in settings and one request will cost you about 2.5k.

```
All data - ~4.75k messages
Chart - ~2.5k messages
Dividends - ~200 messages
Peers - 500 messages
RecommendationTrends - 1k messages
```

## Example

```javascript
const scraper = require("stock-scraper")

scraper({ ticker: "aapl", token: "123" }).then(data => {
  /* do something with data */
})
```

Optionally, you can set settings for requesting data. By default all settings set to true.

```javascript
const scraper = require("stock-scraper")

scraper({
  ticker: "aapl",
  token: "123",
  settings: {
    id: false,
    ticker: true,
    chart: false,
    company: false,
    dividends: true,
    financials: false,
    news: false,
    other: false,
    peers: false,
    recommendationTrends: true
  }
}).then(data => {
  /* do something with data */
})
```

Scraper returns an object with following structure:

```javascript
{ id: 'aapl',
  ticker: 'AAPL',
  chart: [ {} ],  /* Array of objects for every trading day for last 5 years */
  company: {
    symbol: 'AAPL',
    companyName: 'Apple, Inc.',
    exchange: 'NASDAQ',
    industry: 'Telecommunications Equipment',
    website: 'http://www.apple.com',
    description: 'Designs, manufactures, and markets mobile communication, mediadevices, personal computers, and portable digital music players',
    CEO: 'Timothy Donald Cook',
    securityName: 'Apple Inc.',
    issueType: 'cs',
    sector: 'Electronic Technology',
    employees: 132000,
    tags: [ 'Electronic Technology', 'Telecommunications Equipment' ]
  },
  dividends: {
    buybackPercent: 0.052,
    dividendYieldPercent: 0.014,
    dividend: 2.92,
    exDividendDate: '2019-02-08',
    growthRatePercent1y: 0.146,
    growthRatePercent3y: 0.112,
    growthRatePercent5y: 0.105,
    growthRatePercent10y: 0,
    history: [ {} ], /* Array of objects about dividend payments for last 5 years */
    payoutRatioPercent: 0.23,
    yieldOnCost1yPercent: 0.016,
    yieldOnCost3yPercent: 0.02,
    yieldOnCost5yPercent: 0.024,
    yieldOnCost10yPercent: 0.014
  },
  financials: {
    bookPerShare: 24.89,
    cashPerShare: 18.45,
    earningsNextDate: '2019-05-01',
    epsTTM: 11.94,
    epsNextQuarter: 2.36,
    epsGrowthThisYearPercent: 0.326,
    epsGrowthNextYearPercent: 0.126,
    epsGrowthNext5YPercent: 0.13,
    epsGrowthPast5YPercent: 0.165,
    epsGrowthQQPercent: -0.048,
    income: '58.33B',
    marginGrossPercent: 0.382,
    marginOperPercent: 0.26,
    marginProfitPercent: 0.227,
    sales: '261.61B',
    salesGrowthQQPercent: -0.045,
    salesGrowthPast5YPercent: 0.092
  },
  news: [ {} ], /* Array of objects with last news with company mentioning */
  other: {
    institutionalOwnPercent: 0.611,
    recommendation: 2.1
  },
  peers: [ 'MSFT', 'NOK', 'IBM', 'HPQ', 'GOOGL', 'BB' ], /* Array of strings with tickers of peer companies */
  price: {
    change1dPercent: 0.00359,
    change5dPercent: 0.025092,
    change1mPercent: 0.08344,
    change3mPercent: 0.329811,
    change6mPercent: -0.076093,
    changeytdPercent: 0.290907,
    change1yPercent: 0.230147,
    change2yPercent: 0.431199,
    change5yPercent: 1.68661,
    day50MovingAvg: 184.05,
    day200MovingAvg: 191.39,
    marketCap: 961256980800,
    price: 203.86,
    priceTarget: 194.07,
    priceTargetHigh: 245,
    priceTargetLow: 140,
    priceTargetPercent: -0.048,
    yearLow: 142,
    yearHigh: 233.47,
    yearLowPercent: 0.436,
    yearHighPercent: -0.127
  },
  ratios: {
    beta: 1.13,
    debtToEq: 0.97,
    ltDebtToEq: 0.79,
    pb: 8.19,
    pc: 11.05,
    pe: 17.08,
    peForward: 15.91,
    peg: 1.314,
    pegDivAdjusted: 1.186,
    pegDivGrowthAdjusted: 1.174,
    pfcf: 19.88,
    ps: 3.65,
    roa: 0.163,
    roe: 0.509,
    roi: 0.266
  },
  recommendationTrends: [{}] /* Array of objects with analysts ratings(Buy, Overweight, Hold, Underweight, Sell) over time */
}
```

If ticker not found or an error happened returns `undefined`.
