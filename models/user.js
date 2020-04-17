var mongoose = require('mongoose'),
Database = process.env.DATABASE;

mongoose.connect(Database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function(err, db) {
	if (err) {
		console.log('Unable to connect to the server. Please start the server. Error:' + err);
	} else {
		console.log('connected to db');
	}
});

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