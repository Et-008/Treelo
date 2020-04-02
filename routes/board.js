var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser'),
	cookies = require('../models/cookie.js'),
	Board = require('../models/userBoard.js'),
	User = require('../models/user.js');

router.use(bodyParser.urlencoded({extended: true}))

router.get('/myBoard', function(req,res) {
	if(req.session.userId) {
		User.findOne({_id:req.session.userId}, (err, user) =>{
			Board.findOne({userId:req.session.userId}, (err, boards) => {
				if(err) {
					console.log(err);
				} 
				else if(!boards) {
					res.render('boardPage', {userBoard: false, User: user,  Cookie: true})
				} 
				else {
					res.render('boardPage', {userBoard: boards, User: user, Cookie: true})
				}
			})
		})
	} 
	else {
		res.redirect('/login')
	}
})

router.post('/myBoard', function(req, res) {
	Board.findOne({userId:req.session.userId}, (err, board) => {
		if(err) {
			console.log(err);
		} 
		else if(!board) {
			var newBoard = new Board({
				userId: req.session.userId
			})
			newBoard.boardList.push(req.body.boardList)
			newBoard.save(function(err){
				if(err) {
					console.log(err)
				} else {
					req.session.boardId = newBoard._id;
					res.redirect('/myBoard')			
				}
			})
		} 
		else {
			board.boardList.push(req.body.boardList)
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