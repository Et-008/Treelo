var express 	= require('express'),
	router 		= express.Router(),
	bodyParser  = require('body-parser'),
	cookies 	= require('../models/cookie.js'),
	bcrypt 		= require('bcrypt'),
	User 		= require('../models/user.js'),
	flash 		= require('connect-flash'),
	Board 		= require('../models/userBoard.js');

router.use(bodyParser.urlencoded({extended: true}))
router.use(cookies)
router.use(flash())
router.use(function(req, res, next) {
	if(req.session.userId) {
		res.locals.Cookie = true;
	} else {
		res.locals.Cookie = false;
	}
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
})

//Landing page of the app
router.get('/', function(req, res) {
	if(req.session.userId) {
		User.findOne({_id:req.session.userId}, (err, user) => {
			if(err) {
				console.log(err)
			}
			else {
				res.render('menuPage', {User: user})
			}
		})
	}
	else {
		res.render('menuPage', {User: false})
	}
})

router.get('/login', function(req, res) {
	res.render('./authenticate/loginPage', {error: false})
})

router.post('/login', function(req, res) {
	User.findOne({email:req.body.email}, (err, user) => {
		if(!user) {
			err = "Mail id/password is incorrect!";
			console.log("Mail id is incorrect!")
			req.flash('error', err)
			return res.render('./authenticate/loginPage', {error: err})
		}
		else {
			//comparing the password in DB and the entered password and storing in a variable
			var crct_pswd = bcrypt.compareSync(req.body.password, user.password);

			//check if password matches the email id
			if(err || !crct_pswd) {
				err = "Mail id/password is incorrect!"
				console.log("Password is incorrect!")
				req.flash('error', err)
				return res.render('./authenticate/loginPage', {error: err})
			}

			req.session.userId = user._id;
			req.flash('success', "Login Success!");
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
			req.flash('error', err)
			res.render('./authenticate/registerPage', {error: err})
		} else {
			req.session.userId = user._id;
			req.flash('success', 'Registered successfully!')
			res.redirect('/')
		}
	})
})

//Logout of user account
router.get('/Logout', function(req, res){
	req.session.reset();
	req.flash('success', "Logout Success");
	res.redirect('/');
	console.log("Logout success!");
})


module.exports = router;