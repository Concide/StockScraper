module.exports = ({ finviz, iextrading }) => {
  if (!iextrading.logo) return null
  return {
    institutionalOwnPercent: finviz.institOwn["Inst Own"],
    logoLink: iextrading.logo.url,
    recommendation: finviz.recommendation["Recom"]
  }
}
