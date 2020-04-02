var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
	ListTitle: {type: String, require: true, unique: true},
    boardLists: [String]
    // date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Board', boardSchema)