const _ = require('lodash')
const fs = require('fs')

const response = require('../utils/responses')
const removeProperty = require('../utils/objectOperations')
const { readFile, writeFile } = require('../utils/promisifiedFs')

exports.index = async function (req, res) {
  const parsedRequest = req.url.split('/').filter(param => param !== '')

  try {
    const rawData = await readFile(`data/${parsedRequest[0]}.json`, 'utf8')
    const data = JSON.parse(rawData)

    if (parsedRequest.length === 1) {
      return res.send(response(200, 'Success', data))
    }

    if (_.has(data, parsedRequest.filter((item, index) => index !== 0))) {
      return res.send(response(200, 'Success', _.get(data, parsedRequest.filter((item, index) => index !== 0))))
    } else {
      return res.send(response(404, "Property wasn't found"))
    }
  } catch (e) {
    return res.send(response(404, "File wasn't found"))
  }
}

exports.put = async function (req, res) {
  const parsedRequest = req.url.split('/').filter(param => param !== '')

  try {
    const rawData = await readFile(`data/${parsedRequest[0]}.json`, 'utf8')
    let data = JSON.parse(rawData)

    if (parsedRequest.length === 1) {
      await writeFile(`data/${parsedRequest[0]}.json`, JSON.stringify(req.body))

      return res.send(response(200, 'Success', req.body))
    }

    data = _.set(data, parsedRequest.filter((_, index) => index !== 0), req.body)

    await writeFile(`data/${parsedRequest[0]}.json`, JSON.stringify(data))

    return res.send(response(200, 'Success', data))
  } catch (error) {
    const data = {}

    if (parsedRequest.length === 1) {
      await writeFile(`data/${parsedRequest[0]}.json`, JSON.stringify(req.body))

      return res.send(response(200, 'Success', req.body))
    }

    _.set(data, parsedRequest.filter((item, index) => index !== 0), req.body)
    await writeFile(`data/${parsedRequest[0]}.json`, JSON.stringify(data))

    return res.send(response(200, 'Success', data))
  }
}

exports.delete = async function (req, res) {
  const parsedRequest = req.url.split('/').filter(param => param !== '')

  try {
    const rawData = await readFile(`data/${parsedRequest[0]}.json`, 'utf8')
    const propertyToDelete = parsedRequest[parsedRequest.length - 1]
    const data = JSON.parse(rawData)

    if (parsedRequest.length === 1) {
      fs.unlinkSync(`data/${parsedRequest[0]}.json`)
      return res.send(response(200, 'File was deleted'))
    }

    const propertyWasDeleted = removeProperty(data, [propertyToDelete])

    if (!propertyWasDeleted) {
      return res.send(response(404, "Property wasn't found"))
    }

    await writeFile(`data/${parsedRequest[0]}.json`, JSON.stringify(data))

    return res.send(response(200, 'Success', data))
  } catch (error) {
    return res.send(response(404, "File wasn't found"))
  }
}
