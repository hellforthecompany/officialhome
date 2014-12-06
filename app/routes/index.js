exports = module.exports = function( router, EmailList, User ) {

	router.use(function(req, res, next) {
		// do logging
		console.log('request issued!');
		next(); // make sure we go to the next routes and don't stop here
	});


	router.get('/', function(req, res) {
		if (req.session.lastPage) {
			console.log('Last Page: ' + req.session.lastPage);
		}
		req.session.lastPage = '/ (home page)';
		res.render('index');
	});

	router.route('/emailList')
	.get(function(req, res) {
  	  res.render('emailList');
	});

	router.route('/emailListData')
		.post(function(req, res) {
			var member = new EmailList();
			member.email = req.body.email;
			member.fname = req.body.fname;
			member.lname = req.body.lname;

			member.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Thank you! You have been succesfully added to the email list!'});
			});
	}).get(function(req, res) {
			EmailList.find(function(err, members) {
			if (err)
				res.send(err);
  	  res.json(members);
		});
	});

// login view
	router.route('/login')
	.get(function(req, res) {
  	  res.render('login');
	});

// login/out engines
	router.route('/logUserIn')
	.get(function(req, res) {
			User.find(function(err, users) {
			if (err)
				res.send(err);
  	  res.json(users);
		});
	});

	router.route('/logUserOut')
	.get(function(req, res) {
  	  res.render();
	});



// main views
	router.route('/media')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/media';
  	  res.render('media');
	});

	router.route('/tour')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/tour';
  	  res.render('tour');
	});

	router.route('/store')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/store';
  	  res.render('store');
	});

	router.route('/about-contact')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/about-contact';
  	  res.render('about');
	});



// private/admin pages
	router.route('/usersDB')
	.get(function(req, res) {
			User.find(function(err, users) {
			if (err)
				res.send(err);
  	  res.json(users);
		});
	});

	router.route('/users')
		.get(function(req, res) {
			User.find(function(err, users) {
			if (err)
				res.send(err);
  	  res.json(users);
		 });
	}).post(function(req, res) {
			var user = new User();
			user.email = req.body.email;
			user.password = req.body.password;
			user.type = req.body.type;

			user.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'New User Created!'});
			});
	 });

	router.route('/createUser')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/createUser';
  	  res.render('createUser');
	});



}		