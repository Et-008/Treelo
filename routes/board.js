var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	cookies = require('../models/cookie.js'),
	Board = require('../models/userBoard.js'),
	User = require('../models/user.js');
	// userBoardData = require('../models/userBoardData.js');

router.use(bodyParser.urlencoded({extended: true}))

router.get('/myBoard', function(req,res) {
	if(req.session.userId) {
		User.findOne({_id:req.session.userId}).populate("boards").exec((err, user) =>{
			if(err) {
				console.log(err);
			}
			else {
				res.render('boardPage', {User: user, Cookie: true, error: false})
			}
		})
	} 
	else {
		res.redirect('/login')
	}
})

router.post('/myNewBoard', function(req, res) {
	if(req.body.ListTitle){
		Board.create(req.body, function(err, board) {
			if(err) {
				console.log(err);
			} else {
				console.log(board);
				User.findOne({_id:req.session.userId}, (err, user) =>{
					user.boards.push(board)
					user.save(function(err){
						if(err) {
							console.log(err)
						} else {
							req.session.boardId = board._id;
							res.redirect('/myBoard')
						}
					})
				})
			}
		})
	} else if(!req.body.ListTitle) {
		res.redirect('/myBoard')
	}
})

router.post('/myBoard', function(req, res) {
	Board.findOne({_id:req.body.Id}, (err, board) => {
		console.log(board);
		if(err) {
			console.log(err);
			res.redirect('/myBoard', {error: err})
		} 
		else if(!board) {
			res.redirect('/myBoard')
		}
		else {
			board.boardLists.push(req.body.boardData)
			board.save(function(err){
				if(err) {
					console.log(err)
				} else {
					req.session.boardId = board._id;
					res.redirect('/myBoard')	
				}
			})
		}
	})
})


module.exports = router;