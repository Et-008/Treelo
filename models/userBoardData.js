var mongoose = require('mongoose');

var boardDataSchema = mongoose.Schema({
	boardData: String
    // date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('boardList', boardDataSchema)