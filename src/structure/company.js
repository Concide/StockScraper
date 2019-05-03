module.exports = ({ finviz, iextrading }) => {
  return {
    ...iextrading.company,
    country: finviz.country
  }
}
