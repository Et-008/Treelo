var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	cookies = require('../models/cookie.js'),
	User = require('../models/user.js');

router.use(bodyParser.urlencoded({extended: true}))

router.get('/userProfile', function(req,res) {
	if(req.session.userId) {
		User.findOne({_id:req.session.userId}, (err, user) =>{
			if(err) {
				console.log(err)
				req.flash('error', err)
				res.redirect('/')
			} else {
				res.render('./authenticate/userProfile', {User: user})
			}
		})
	}
})

module.exports = router;