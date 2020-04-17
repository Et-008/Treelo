var mongoose = require('mongoose'),
Database = process.env.DATABASE;

mongoose.connect(Database, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

var userSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	boards: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Board'
	}]
})

var User = mongoose.model('User', userSchema)

module.exports = User;