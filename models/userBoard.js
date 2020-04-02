var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/treelo', {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})

var boardSchema = mongoose.Schema({
	userId: String,
    boardList: [String]
    // date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Board', boardSchema)