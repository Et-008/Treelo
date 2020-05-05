var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	cookies = require('../models/cookie.js'),
	Board = require('../models/userBoard.js'),
	User = require('../models/user.js');
	// userBoardData = require('../models/userBoardData.js');

router.use(bodyParser.urlencoded({extended: true}))

router.get('/myGames', function(req,res) {
	activePageNo = 2;
	if(req.session.userId) {
		User.findOne({_id:req.session.userId}).populate("boards").exec((err, user) =>{
			if(err) {
				console.log(err);
			}
			else {
				res.render('Game', {User: user})
			}
		})
	}
	else {
		req.flash('error', 'You have to login to do that');
		res.redirect('/login')
	}
})

module.exports = router;