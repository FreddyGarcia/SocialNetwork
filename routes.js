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
		console.log("paso por qu");
		res.render('index', { username : req.session.username});
	})

	app.get('/chat', isntLoggedIn, function (req, res){
		res.render('chat');
	})

	app.get('/findfriend/:friendname', function (req, res) {
		res.render('findfriend', { friendname : req.params.friendname});
	})

	app.get('/login', isLoggedIn, function (req, res){
		
		res.render('login', { message : req.flash('message', "sd")});
	})

	app.get('/flash', function (req, res){
	  req.flash('info', 'Hi there! ')
	  res.render('flash', { message: req.flash('info') });
	})

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})

	// #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### 
	//	post


	app.post('/login', passport.authenticate('login', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash	: true
	}))

	app.post('/signup', passport.authenticate('signup', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash	: true
	}))
}

module.exports = routes;