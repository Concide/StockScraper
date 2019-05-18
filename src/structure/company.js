module.exports = ({ finviz, iextrading }) => {
  const data = {
    ...iextrading.company,
    country: finviz.country
  }

  return data
}
