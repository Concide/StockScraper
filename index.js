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

    const data = {
      ticker: ticker.toUpperCase(),
      ...finvizData,
      ...guruFocusData,
      ...iextradingData
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
