exports = module.exports = function( router, EmailList, User, Post, bcrypt ) {

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

// login views
	router.route('/login')
	.get(function(req, res) {
  	  res.render('login');
	});

// login/out engines
	router.route('/logUserIn')
	.post(function(req, res) {
		var user = {};
		user.email = req.body.email;
		user.password = req.body.password;

		User.findOne ({'email': user.email, 'password': (user.password)}, function (err, u) {
					if (!u) {
						console.log('email/password combination incorrect!');
					}
					else {
						console.log('success!! user:', u);
						return res.render('media');
					} 
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
	router.route('/membersHome')
	.get(function(req, res) {
	  if (req.session.lastPage) {
			console.log('Last Page: ' + req.session.lastPage);
      }
	  req.session.lastPage = '/membersHome';
  	  res.render('membersHome');
	});

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
			console.log(user.password);

			console.log("user pwd: " + user.password);
			console.log("user email: " + user.email);

			bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(user.password, salt, function(err, hash) {
		    // Store hash in your password DB. 
		    	user.password = hash; 
		    	console.log('hash: ' + hash);

			    	user.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'New User Created!'});
					});
   		    	});
			});
	});


	router.route('/users/:user_id')
	// get the user with that id
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			res.render('editUser');
		});
	}).post(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err)
			user.title = req.body.title;
			user.content = req.body.content;
		});
	}).put(function(req, res) {
	// find the user
	User.findById(req.params.user_id, function(err, user) {	
		if (err)
			res.send(err);
		user.title = req.body.title;
		user.content = req.body.content; 	// update the users info
		user.save(function(err) {			// save the user
			if (err)
				res.send(err);
			res.json({ message: 'User updated!' });
		});
	});
	}).delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
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


	router.route('/createPost')
    .get(function(req, res) {
      res.render('createPost');
  }).post(function(req, res) {
      var post = new Post();
      post.title = req.body.title;
      post.content = req.body.content;
      post.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'New Post Created!'});
      });
  }); 

  router.route('/managePosts')
    .get(function(req, res) {
      res.render('managePosts');
  	}).put(function(req, res) {
  	}).delete(function(req, res) {
  });

  router.route('/manageUsers')
    .get(function(req, res) {
      res.render('manageUsers');
  });


  router.route('/usersData/:user_id')
	.get(function(req, res) {
		var content;
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			content = user;
			if (req.session.lastPage) {
					console.log('Last Page: ' + req.session.lastPage);
			}
			res.json(content);
		});
	});

  router.route('/deleteUser/:user_id')
	.get(function(req, res) {
		var content;
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);
			content = user;
			if (req.session.lastPage) {
					console.log('Last Page: ' + req.session.lastPage);
			}
			res.render('deleteUser');
		});
	});


  router.route('/posts/:post_id')
	// get the post with that id
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			res.render('editPost');
		});
	}).post(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err)
			post.title = req.body.title;
			post.content = req.body.content;
		});
	}).put(function(req, res) {
	// find the post
	Post.findById(req.params.post_id, function(err, post) {	
		if (err)
			res.send(err);
		post.title = req.body.title;
		post.content = req.body.content; 	// update the posts info
		post.save(function(err) {			// save the post
			if (err)
				res.send(err);
			res.json({ message: 'Post updated!' });
		});
	});
	}).delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});


  router.route('/posts')
    .get(function(req, res) {
      Post.find(function(err, posts) {
      if (err)
        res.send(err);
      res.json(posts);
     });
  });

  router.route('/userCreated')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/userCreated';
  	  res.render('userCreated');
	});

}		