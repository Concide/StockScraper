const request = require("request")

const finviz = require("./src/finviz")
const guruFocus = require("./src/guruFocus")
const iextrading = require("./src/iextrading")

const getData = async ticker => {
  try {
    const finvizData = await finviz(ticker)

    let guruFocusData

    if (finvizData.dividend) {
      guruFocusData = await guruFocus(ticker)
    }

    const iextradingData = await iextrading(ticker)

    let pegAdjusted

    if (
      finvizData.pe &&
      finvizData.epsThisYearGrowthPercent &&
      finvizData.dividendPercent &&
      finvizData.dividendPercent < 0.04 &&
      finvizData.epsThisYearGrowthPercent > 0
    ) {
      const { dividendPercent, epsThisYearGrowthPercent, pe } = finvizData

      pegAdjusted = Number(
        (pe / ((dividendPercent + epsThisYearGrowthPercent) * 100)).toFixed(3)
      )

      if (guruFocusData && guruFocusData.cagr5YPercent) {
        pegAdjusted = Number(
          (
            pe /
            ((dividendPercent * (1 + guruFocusData.cagr5YPercent) +
              epsThisYearGrowthPercent) *
              100)
          ).toFixed(3)
        )
      }
    }

    const data = {
      ticker: ticker.toUpperCase(),
      data: {
        ticker: ticker.toUpperCase(),
        ...finvizData,
        ...guruFocusData,
        ...iextradingData.data,
        pegDivAdjusted: pegAdjusted ? pegAdjusted : finvizData.peg,
        fairPricePercent: Number(
          (finvizData.targetPrice / iextradingData.data.price - 1).toFixed(3)
        )
      },
      charts: {
        ...iextradingData.charts
      }
    }

    if (data.statusCode) {
      return {
        statusCode: data.statusCode,
        message: data.message
      }
    }
    return data
  } catch (err) {
    return err
  }
}

module.exports = getData
