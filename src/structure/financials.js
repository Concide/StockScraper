module.exports = ({ finviz, iextrading }) => {
  return {
    bookPerShare: finviz.bookPerShare["Book/sh"],
    cashPerShare: finviz.cashPerShare["Cash/sh"],
    earningsNextDate: iextrading.stock.nextEarningsDate,
    epsTTM: finviz.epsTTM["EPS (ttm)"],
    epsNextQuarter: finviz.epsNextQuarter["EPS next Q"],
    epsGrowthThisYearPercent: finviz.epsThisYear["EPS this Y"],
    epsGrowthNextYearPercent: finviz.epsGrowthNextYear["EPS next Y"],
    epsGrowthNext5YPercent: finviz.epsNext5Y["EPS next 5Y"],
    epsGrowthPast5YPercent: finviz.epsPast5Y["EPS past 5Y"],
    epsGrowthQQPercent: finviz.epsQQ["EPS Q/Q"],
    income: finviz.income["Income"],
    marginGrossPercent: finviz.grossMargin["Gross Margin"],
    marginOperPercent: finviz.operMargin["Oper. Margin"],
    marginProfitPercent: finviz.profitMargin["Profit Margin"],
    sales: finviz.sales["Sales"],
    salesGrowthQQPercent: finviz.salesQQ["Sales Q/Q"],
    salesGrowthPast5YPercent: finviz.salesGrowthPast5Y["Sales past 5Y"]
  }
}
