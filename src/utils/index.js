const checkValue = (value, decimal = 3) => {
  if (value[value.length - 1] === "%") {
    return Number((value.substring(0, value.length - 1) / 100).toFixed(decimal))
  } else if (value.length === 1 && value[0] === "-") {
    return null
  } else if (isNaN(Number(value))) {
    return value
  } else {
    return Number(value)
  }
}

const getAccess = (access, value) => {
  if (access) {
    return value
  } else {
    return null
  }
}

const getNode = node => {
  if (node.children) {
    return getNode(node.children[0])
  }
  return node.data
}

const filterData = obj => {
  let data = {}

  for (let key in obj) {
    if (obj[key]) {
      data = {
        ...data,
        [key]: obj[key]
      }
    }
  }

  return data
}

const reduceToObject = ({ labels, data }) =>
  data
    .map((data, index) => ({
      id: labels[index],
      data
    }))
    .reduce((obj, item) => {
      obj[item.id] = item.data
      return obj
    }, {})

module.exports = {
  checkValue,
  filterData,
  getAccess,
  getNode,
  reduceToObject
}
