const projectDividendIncome = (
  dividend = 1.05,
  divGrowth = 0.12,
  price = 30,
  costGrowth = 0.1,
  years = 20,
  initialMoney = 10000,
  reinvest = true
) => {
  const initialStocks = initialMoney / price
  const initialDividend = initialStocks * dividend

  const array = [
    {
      year: 0,
      money: initialMoney,
      stocks: initialStocks,
      price,
      dividend,
      dividendIncome: initialDividend,
      overallDividendIncome: 0
    }
  ]

  for (let i = 0; i < years; i++) {
    const dividendIncome = reinvest ? array[i].dividendIncome : 0

    array.push({
      year: array[i].year + 1,
      money: calculateMoney(array[i].money, dividendIncome),
      stocks: calculateStocks(array[i].stocks, dividendIncome, array[i].price),
      price: calculatePriceGrowth(array[i].price, costGrowth),
      dividend: calculateDividend(array[i].dividend, divGrowth),
      dividendIncome: calculateDividendIncome(
        array[i].stocks,
        array[i].dividend,
        divGrowth
      ),
      overallDividendIncome:
        array[i].overallDividendIncome + array[i].dividendIncome
    })
  }

  const overall = {
    years: array[array.length - 1].year,
    moneyBegin: initialMoney,
    moneyEnd: array[array.length - 1].money,
    overallDividendIncome: array[array.length - 1].overallDividendIncome,
    moneyGrowthPercent: calculateGrowthPercent(
      initialMoney,
      array[array.length - 1].money
    ),
    dividendBegin: dividend,
    dividendEnd: array[array.length - 1].dividend,
    dividendGrowthPercent: calculateGrowthPercent(
      dividend,
      array[array.length - 1].dividend
    ),
    dividendIncomeBegin: array[0].dividendIncome,
    dividendIncomeEnd: array[array.length - 1].dividendIncome,
    dividendIncomeGrowthPercent: calculateGrowthPercent(
      array[0].dividendIncome,
      array[array.length - 1].dividendIncome
    ),
    yearsHistory: array
  }

  return overall
}

const calculateMoney = (money, dividendIncome) => money + dividendIncome
const calculateStocks = (stocks, dividendIncome, price) =>
  stocks + dividendIncome / price
const calculatePriceGrowth = (price, costGrowth) => price * (1 + costGrowth)
const calculateDividend = (dividend, divGrowth) => dividend * (1 + divGrowth)
const calculateDividendIncome = (stocks, dividend, divGrowth) =>
  stocks * (dividend * (1 + divGrowth))

const calculateGrowthPercent = (begin, end) => end / begin - 1

module.exports = {
  projectDividendIncome
}
