const sessions = require('./session');

module.exports = (req, res, next) => {
	res.json({tasks});
	res.status(200);
	next();
}