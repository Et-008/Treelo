var express 	= require('express'),
	User 		= require('./models/user.js'),
	basicRoutes = require('./routes/basicRoutes.js'),
	board 		= require('./routes/board.js'),
	games 		= require('./routes/games.js'),
	userProfile = require('./routes/userProfile.js'),
	path 		= require('path'),
	app 		= express();

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
app.use(basicRoutes)
app.use(board)
app.use(games)
app.use(userProfile)



app.listen(process.env.PORT, process.env.IP, function() {
	console.log('Server has started')
	console.log(process.env.PORT)
})
