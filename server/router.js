'use strict';

const Router = require('koa-router');
const router = new Router();
const hello = require('./controllers/hello');
const positions=require('./controllers/positions');


router.get('/hello/:name',hello.hello);
router.get('/ship',positions.positions);
//router.get('./hello',hello.hello);

// TODO Error handling if message cannot be served

module.exports = router;


