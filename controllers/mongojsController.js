var	mongojs = require('mongojs'),
	db		= mongojs.connect('mongodb://localhost/test', ['users' , 'chat']);
	admin	= mongojs.connect('mongodb://localhost/admin');
	dbs 	= []

var mongojsController = function () {

	db.on('error',function (err) {
	    console.log('database error', err);
	});

	db.on('ready',function () {
	    console.log('database connected');
	});

	dbs.push(db);
	dbs.push(admin);

	return dbs;
}

module.exports = mongojsController;