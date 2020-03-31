const removeProperty = require('../utils/objectOperations')

it('should delete data', async (done) => {
  let testObject = { property1: { property2: 1 } }

  expect(testObject.property1.property2).toEqual(1)

  removeProperty(testObject, ['property2'])

  expect(testObject.property1.property2).toBeFalsy()
  return done()
})
