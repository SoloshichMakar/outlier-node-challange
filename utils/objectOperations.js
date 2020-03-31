const _ = require('lodash')

function removeProperty (collection, excludeKeys) {
  let deleted = false
  function omitFn (value) {
    if (value && typeof value === 'object') {
      excludeKeys.forEach((key) => {
        if (value[key]) {
          delete value[key]
          deleted = true
        }
      })
    }
  }

  _.cloneDeepWith(collection, omitFn)
  return deleted
}

module.exports = removeProperty
