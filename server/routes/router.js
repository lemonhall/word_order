const router = require('express').Router();
const bodyParser = require('body-parser');

//接口服务
const register = require('../service/register');

router.use(bodyParser.json());

router.get('/register', register)

module.exports = {
	router : router,
};