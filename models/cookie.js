var	cookies = require('client-sessions');

module.exports = cookies({
	cookieName: 'session',
	secret: process.env.SECRET,
	duration: 1000
})