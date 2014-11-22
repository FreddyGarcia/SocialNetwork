var User 	 = require('./models/user'),
	Chat 	 = require('./models/chat'),
	passport = require('passport');


var routes = function (app) {

	// collections
	// var users = db.users;
	// var chat  = db.chat;
	//
	// Middlewares
	var isntLoggedIn = function (req, res, next) {
		if (!req.isAuthenticated()) {
			res.redirect('/login');
			return;
		};
		next();
	}

	var isLoggedIn = function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/');
			return;
		};
		next();
	}

	var isValidLoggin = function (req, res, next) {
		if (!req.session.username) {
			res.redirect('/login');
			return;
		};
		next();
	}

	// #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 		

	var signUpUser = function (req, res, next) {
		
		admin.addUser({
			user : req.body.username,
			pwd : req.body.password,
			customData : {
				email	  : req.body.email,
				lastname  : req.body.lastname
			},
			roles : []
		})

		next();
	}

	// rutas

	// #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
	// get

	app.get('/', isntLoggedIn, function (req, res){
		res.render('index', { username : req.session.username});
	})

	app.get('/chat', isntLoggedIn, function (req, res){
		res.render('chatAlternativo');
	})

	app.get('/profile', isntLoggedIn, function (req, res){
		res.render('profile', { user : req.session.passport.user});
	})

	app.get('/contacts', isntLoggedIn, function (req, res){
		User.find({_id : { $in : req.user.friends }}, function (err, data) {
		res.render('contacts', { friends : data });
		})
	})

	app.get('/login', isLoggedIn, function (req, res){
		res.render('login', {message : req.flash('error')});
	})

	app.get('/signup', function (req, res){
		res.render('signup');
	})

	app.get('/logout', function (req, res) {
		if (req.isAuthenticated()) {
			req.logout();
		};
		res.redirect('/');
	})



// var mongojs = require('mongojs');
// var db = mongojs('mongodb://localhost/test', ['test'] );
// var u = db.collection('users');

app.get('/prueba', function (req, res) {
	// a.push(mongojs.ObjectId("546dec227c45e13033e19ecd"));
	// a.push(mongojs.ObjectId("546df8702f251edc38da8c13"));
	var amigos = req.user.friends;
	// u.find({ _id : {$in : req.user.friends} }, function (err, data) {
	// u.find({_id : mongojs.ObjectId("546e668de8537e701ef34d04")}).forEach(function (err, data) {
	// u.find({'_id' : { $in : req.user.toJSON().friends}}).forEach(function (err, data) {
	User.find({_id : { $in : amigos }}, function (err, data) {
		// a.push(data);
		console.log(data);
	})
		res.send('xD');
})

	// #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
	//	post


	app.post('/login', passport.authenticate('login', {
		successRedirect : '/contacts',
		failureRedirect : '/login',
		failureFlash	: true
	}))

	app.post('/signup', passport.authenticate('signup', {
		successRedirect : '/contacts',
		failureRedirect : '/login',
		failureFlash	: true
	}))
}

module.exports = routes;