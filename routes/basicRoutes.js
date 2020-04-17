var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	cookies = require('../models/cookie.js'),
	bcrypt = require('bcrypt'),
	User = require('../models/user.js'),
	Board = require('../models/userBoard.js');

router.use(bodyParser.urlencoded({extended: true}))
router.use(cookies)

//Landing page of the app
router.get('/', function(req, res) {
	if(req.session.userId) {
		User.findOne({_id:req.session.userId}, (err, user) => {
			if(err) {
				console.log(err)
			}
			else {
					res.render('landingPage', {User: user, Cookie: true})
			}
		})
	}
	else {
		res.render('landingPage', {User: false, Cookie: false})
	}
})

router.get('/login', function(req, res) {
	res.render('./authenticate/loginPage', {error: false})
})

router.post('/login', function(req, res) {
	User.findOne({email:req.body.email}, (err, user) => {
		if(!user) {
			err = "Mail id is incorrect!"
			return res.render('./authenticate/loginPage', {error: err})
		}
		else {
			//comparing the password in DB and the entered password and storing in a variable
			var crct_pswd = bcrypt.compareSync(req.body.password, user.password);

			//check if password matches the email id
			if(err || !crct_pswd) {
				err = "Password is not matching!"
				return res.render('./authenticate/loginPage', {error: err})
			}

			req.session.userId = user._id;
			res.redirect("/");
			console.log("Login success!");
		}
	})
})

router.get('/register', function(req, res) {
	res.render('./authenticate/registerPage', {error: false})
})

router.post('/register', function(req, res) {
	var encrypted_password = bcrypt.hashSync(req.body.password, 10);
	req.body.password = encrypted_password;
	User.create(req.body, function(err, user) {
		if(err) {
			console.log(err)
			if(err.code===11000) {
				err = "Email Id already exists"
			}
			res.render('./authenticate/registerPage', {error: err})
		} else {
			req.session.userId = user._id;
			res.redirect('/')
		}
	})
})

//Logout of user account
router.get('/Logout', function(req, res){
	req.session.reset();
	res.redirect('/');
})

module.exports = router;