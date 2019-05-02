const finvizAPI = require("./src/api/finviz")
const guruFocusAPI = require("./src/api/guruFocus")
const iextradingAPI = require("./src/api/iextrading")

const buildObject = require("./src/utils/buildObject")
const getSettings = require("./src/utils/getSettings")

const getData = async ({ ticker, token, settings = {} }) => {
  try {
    if (!token) return undefined
    const dataSettings = getSettings(settings)

    let data = {
      gurufocus: null,
      finviz: await finvizAPI(ticker),
      iextrading:
        token &&
        (await iextradingAPI({ ticker, token, settings: dataSettings }))
    }

    if (data.finviz.statusCode || !data.iextrading) return undefined

    if (dataSettings.dividends || dataSettings.ratios) {
      data = { ...data, gurufocus: await guruFocusAPI(ticker) }
    }

    return buildObject(ticker, data, dataSettings)
  } catch (err) {
    return undefined
  }
}

module.exports = getData
