const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect('mongodb+srv://Trua:**REMOVED**@cluster0.uzeyt.mongodb.net/?retryWrites=true&w=majority')
	.then(client => {
		console.log("CONNECTED!");
		_db = client.db();
		callback();
		//console.log(client);
	})
	.catch(err => {
		console.log(err);
		throw error;
	});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw "No Database Found.";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;