'use strict';

require('chai').should();
const request = require('request-promise-native');

try {
  require('./../server/REMOVE/index.js');
} catch (e) {
  if (e.code === 'MODULE_NOT_FOUND') require('./../server/index.js');
  else throw e;
}

const urlBase = 'http://localhost:3000';
const opts = {resolveWithFullResponse: true};
const notFound = '<h1>Sorry, this URL does not exist</h1>';

describe('Hello server', () => {

  it('the "hello" route should respond with an h1 that says "Hello {name}!"', async () => {
    const res1 = await request(urlBase + '/hello/world', opts);
    const res2 = await request(urlBase + '/hello/Codeworks', opts);
    res1.statusCode.should.equal(200);
    res1.body.should.include('<h1>Hello world!</h1>');
    res2.statusCode.should.equal(200);
    res2.body.should.include('<h1>Hello Codeworks!</h1>');
  });

  it('any other request should receive a 404 that says "Sorry, this URL does not exist"', async () => {
    try {
      const res = await request(urlBase + '/', opts);
      res.statusCode.should.equal(404);
    } catch (e) {
      if (e.statusCode !== 404 || !e.response.body.includes(notFound)) throw e;
    }
    try {
      const res = await request(urlBase + '/index.js', opts);
      res.statusCode.should.equal(404);
    } catch (e) {
      if (e.statusCode !== 404 || !e.response.body.includes(notFound)) throw e;
    }
    try {
      const res = await request(urlBase + '/hello/', opts);
      res.statusCode.should.equal(404);
    } catch (e) {
      if (e.statusCode !== 404 || !e.response.body.includes(notFound)) throw e;
    }
  });

});
