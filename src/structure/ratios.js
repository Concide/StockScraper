const {
  calculateAdjustedPeg,
  calculateDivGrowthAdjustedPeg,
  calculatePeg
} = require("../utils/stockHelpers")

module.exports = ({ finviz, gurufocus }) => {
  return {
    beta: finviz.beta["Beta"],
    debtToEq: finviz.debtToEq["Debt/Eq"],
    ltDebtToEq: finviz.ltDebtToEq["LT Debt/Eq"],
    pb: finviz.pb["P/B"],
    pc: finviz.pc["P/C"],
    pe: finviz.pe["P/E"],
    peForward: finviz.forwardPE["Forward P/E"],
    peg: calculatePeg(finviz),
    pegDivAdjusted: calculateAdjustedPeg(finviz),
    pegDivGrowthAdjusted: calculateDivGrowthAdjustedPeg(finviz, gurufocus),
    pfcf: finviz.pfcf["P/FCF"],
    ps: finviz.ps["P/S"],
    roa: finviz.roa["ROA"],
    roe: finviz.roe["ROE"],
    roi: finviz.roi["ROI"]
  }
}