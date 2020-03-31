const request = require('supertest-as-promised')
const fs = require('fs')
const server = require('../server')

describe('GET request', () => {
  it('should return data', async (done) => {
    const res = await request(server)
      .get('/s1s')

    expect(res.statusCode).toEqual(200)
    return done()
  })

  it('should return error if file doesnt exist', async (done) => {
    const res = await request(server)
      .get('/dontexist')

    expect(res.body.status).toEqual(404)
    return done()
  })
})

describe('PUT request', () => {
  beforeEach(() => {
    if(fs.existsSync('data/s1s.json')) {
      fs.unlinkSync('data/s1s.json')
    }
  })

  it('should add data', async (done) => {
    const newObj = {
      value: 'First put'
    }
    const res = await request(server)
      .put('/s1s').send(newObj)

    expect(res.statusCode).toEqual(200)
    expect(JSON.stringify(res.body.data)).toEqual(JSON.stringify(newObj))
    return done()
  })

  it('should add nested data', async (done) => {
    const newObj = {
      value: 'First put'
    }
    const res = await request(server)
      .put('/s1s/nested').send(newObj)

    expect(res.statusCode).toEqual(200)

    expect(JSON.stringify(res.body.data)).toEqual(JSON.stringify({nested: newObj}))
    return done()
  })
})

describe('DELETE request', () => {
  it('should delete data', async (done) => {
    const res = await request(server)
      .delete('/s1s/value')

    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('Success')
    return done()
  })

  it('should return error if file doesnt exist', async (done) => {
    const res = await request(server)
      .delete('/dontexist')

    expect(res.body.status).toEqual(404)
    return done()
  })

  it('should return error if property doesnt exist', async (done) => {
    const res = await request(server)
      .delete('/s1s/dontexist')

    expect(res.body.status).toEqual(404)
    return done()
  })
})