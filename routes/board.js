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
				res.render('boardPage', {User: user})
			}
		})
	}
	else {
		req.flash('error', 'You hav to login to do that');
		res.redirect('/login')
	}
})

router.post('/myBoard/myNewList', function(req, res) {
	if(req.body.ListTitle){
		Board.create(req.body, function(err, board) {
			if(err) {
				console.log(err);
				req.flash('error', err);
				res.redirect('/');
			} else {
				User.findOne({_id:req.session.userId}, (err, user) =>{
					user.boards.push(board)
					user.save(function(err){
						if(err) {
							console.log(err)
						} else {
							req.session.boardId = board._id;
							req.flash('success', 'New list added');
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

router.post('/myList/:listId/myListItem', function(req, res) {
	Board.findOne({_id:req.params.listId}, (err, board) => {
		if(err) {
			console.log(err);
			req.flash('error', err)
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

router.post('/myList/:listId', function(req, res) {
	Board.findOneAndDelete({_id: req.params.listId}, function(err) {
		if(err) {
			req.flash('error')
			res.redirect('/myBoard');
		} else {
			User.findOne({_id: req.session.userId}, function(err, user) {
				var boardIndex = user.boards.indexOf(req.params.listId)
				user.boards.splice(boardIndex, 1);
				user.save(function(err){
					if(err) {
						console.log(err)
						req.flash('error', err);
						res.redirect('/myBoard')
					} else {
						req.flash('success', 'List deleted');
						res.redirect('/myBoard')
					}
				})				
			})
		}
	})
})

router.post('/myList/:listId/myListItem/:listNum', function(req, res) {
	console.log(req.params)
	Board.findOne({_id:req.params.listId}, (err, board) => {
		if(err) {
			console.log(err);
			req.flash('error', err)
			res.redirect('/myBoard', {error: err})
		}
		else if(!board) {
			req.flash('error', 'No board found')
			res.redirect('/myBoard')
		}
		else {
			board.boardLists.splice(req.params.listNum, 1)
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