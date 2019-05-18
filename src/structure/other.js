module.exports = ({ finviz, iextrading }) => {
  if (!iextrading.logo) return null

  const data = {
    institutionalOwnPercent: finviz.institOwn["Inst Own"],
    logoLink: iextrading.logo.url,
    recommendation: finviz.recommendation["Recom"]
  }

  return data
}
