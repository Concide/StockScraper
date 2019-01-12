# Stock Scraper

Stock Scraper is a little script, that fetches and parses data about stock from :

1. FinViz
2. GuruFocus
3. iexTrading API

## Example

```javascript
//* import scraper from "./Stock-Scraper" */
const stockScraper = require("./stockScraper")

scraper("aapl").then(data => {
  /* do something with data */
})
```

Scraper returns an object with following structure:

```javascript
{ ticker: 'AAPL',
  'P/E': '12.54',
  'Forward P/E': '11.09',
  'EPS (ttm)': '12.15',
  'EPS next Q': '4.23',
  'EPS this Y': 0.326,
  'EPS next Y': 0.11449999999999999,
  'EPS next 5Y': 0.13,
  'EPS past 5Y': 0.165,
  'EPS Q/Q': 0.3,
  'Sales past 5Y': 0.092,
  'Sales Q/Q': 0.196,
  Income: '61.03B',
  Sales: '265.60B',
  PEG: '0.96',
  'P/S': '2.90',
  'P/B': '6.83',
  'P/C': '11.61',
  'P/FCF': '15.27',
  'Gross Margin': 0.38299999999999995,
  'Oper. Margin': 0.267,
  'Profit Margin': 0.22399999999999998,
  'Book/sh': '22.31',
  'Cash/sh': '13.12',
  ROA: 0.16,
  ROE: 0.48700000000000004,
  ROI: 0.266,
  'Debt/Eq': '1.07',
  'LT Debt/Eq': '0.87',
  'Inst Own': 0.612,
  '52W Low': 0.0725,
  '52W High': -0.3477,
  Dividend: '2.92',
  'Dividend %': 0.0192,
  Beta: '1.21',
  'Target Price': '218.78',
  Recom: '2.20',
  divSinceYear: '2012',
  divIncreaseStreak: 7,
  payoutRatio: 0.23,
  cagr1Y: 0.133,
  cagr3Y: 0.11199999999999999,
  cagr5Y: 0.105,
  cagr10Y: 0,
  yoc1Y: 0.021,
  yoc3Y: 0.0254,
  yoc5Y: 0.0305,
  yoc10Y: 0.018500000000000003,
  logo: 'https://storage.googleapis.com/iex/api/logos/AAPL.png',
  company: 'Apple Inc.',
  marketCap: 720301698870,
  sector: 'Technology',
  industry: 'Computer Hardware',
  tags: [ 'Technology', 'Consumer Electronics', 'Computer Hardware' ],
  website: 'http://www.apple.com',
  description: 'Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.',
  CEO: 'Timothy D. Cook',
  week52low: 142,
  week52high: 233.47,
  y5changePercent: 1.168143986742559,
  y2changePercent: 0.31863203074874297,
  y1changePercent: -0.11310799478196049,
  ytdchangePercent: -0.03565096251266461,
  m6changePercent: -0.1943402255360662,
  m3changePercent: -0.29367086611470744,
  m1changePercent: -0.10206367924528303,
  d30changePercent: -0.15833978114292033,
  d5changePercent: 0.02947339958088275,
  todayChangePercent: -0.00982,
  exDividendDate: '2018-11-08 00:00:00.0',
  price: 152.29,
  news: [ {} ], /* Array of objects with last news with company mentioning */
  peers: [ 'XLK' ], /* Array of strings with tickers of peer companies */
  earnings: [ {} ], /* Array of objects with earnings data for 4 last quarters */
  financialsQuarter: [ {} ], /* Array of objects with financial data for 4 last quarters */
  financialsYear: [ {} ], /* Array of objects with financial data for 4 last years annually */
  charts:
   { chart1d: [ {} ], /* Array of objects for every minute for last trading day */
     chart5d: [ {} ], /* Array of objects for every trading day for last 5 days */
     chart1m: [ {} ], /* Array of objects for every trading day for last month */
     chart3m: [ {} ], /* Array of objects for every trading day for last 3 months */
     chart6m: [ {} ], /* Array of objects for every trading day for last 6 months */
     chart1y: [ {} ], /* Array of objects for every trading day for last year */
     chart2y: [ {} ], /* Array of objects for every trading day for last 2 years */
     chart5y: [ {} ]  /* Array of objects for every trading day for last 5 years */
  }
     }
```
