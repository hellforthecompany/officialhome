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

	

// login views
	router.route('/login')
	.get(function(req, res) {
  	  res.render('login');
	});

// login/out engines
	router.route('/logUserIn')
	.post(function(req, res) {
		var password;
		var user = {};
		user.email = req.body.email;
		user.password = req.body.password;	
		User.findOne ({'email': user.email}, function (err, u) {
				if (!u) {
					res.json('email not found!');
				}
				else {
					bcrypt.compare(user.password, u.password, function(err, result) {
					     if(result == true){
							req.session.loggedIn = true;
							req.session.user = u.fname;
							req.session.userEmail = u.email;
							req.session.save();
							res.redirect('/membersHome');
							}
						 else{
						 	//req.session.loggedIn = true;
						 	console.log('result: ' + result);
							res.redirect('/manageUsers');
						 }
					});
				} 
		});
		
	});

	router.route('/logOut')
	.get(function(req, res) {
	  req.session.loggedIn = null;
  	  res.render('logout');
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
	//  console.log('req.session.loggedIn: ' + req.session.loggedIn);
	  if (req.session.lastPage) {
			console.log('Last Page: ' + req.session.lastPage);
			req.session.lastPage = '/membersHome';
      }

      if(req.session.loggedIn){
      	res.render('membersHome');
      }else{
      	res.render('notLoggedIn');
      }

	});

	router.route('/sessionsData')
	.get(function(req, res) {
		if (req.session.lastPage) {
			console.log('Last Page: ' + req.session.lastPage);
			req.session.lastPage = '/membersHome';
      	}

		if(req.session.loggedIn){
		res.json(req.session);
		}else{
		res.render('notLoggedIn');
		}


	})

	router.route('/notLoggedIn')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			//req.session.lastPage = '/notLoggedIn';
  	  res.render('notLoggedIn');
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
			if(req.session.loggedIn){
				res.json(members);
			}
			else{
				res.render('notLoggedIn');
			}
		});
	});



	router.route('/usersDB')
	.get(function(req, res) {
			User.find(function(err, users) {
			if (err)
				res.send(err);
			if(req.session.loggedIn){
		      res.json(users);
		    }
		    else{
              res.render('notLoggedIn');
		    } 
		});
	});

	router.route('/users')
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);
			if(req.session.loggedIn){
		      res.json(users);
		    }
		    else{
              res.render('notLoggedIn');
		    }
		 });
	}).post(function(req, res) {
		//	if(!req.session.loggedIn){res.redirect('notLoggedIn');} 
			var user = new User();
			user.email = req.body.email; 
			user.password = req.body.password;
			user.type = req.body.type;

			bcrypt.genSalt(10, function(err, salt) {
		    	bcrypt.hash(user.password, salt, function(err, hash) {
		   			 // Store hash in your password DB. 
		    		user.password = hash; 
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
			if(req.session.loggedIn){
		      res.render('editUser');
		    }
		    else{
              res.render('notLoggedIn');
		    }
		});
	}).post(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err)
		});
	}).put(function(req, res) {
		// find the user
		User.findById(req.params.user_id, function(err, user) {	
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			user.password = req.body.password;

			bcrypt.genSalt(10, function(err, salt) {
		    	bcrypt.hash(user.password, salt, function(err, hash) {
		   			 // Store hash in your password DB. 
		    		user.email = req.body.email;
					user.fname = req.body.fname;
					user.lname = req.body.lname; 	// update the users info
					user.type = req.body.type;
					user.password = hash; 

					user.save(function(err) {			// save the user
						if (err){res.send(err);}
						res.render('manageUsers');
					});
   		    	});
			});

		/*	user.email = req.body.email;
			user.fname = req.body.fname;
			user.lname = req.body.lname; 	// update the users info
			user.type = req.body.type;
			user.save(function(err) {			// save the user
				if (err){res.send(err);}
				res.render('manageUsers');
			});
		*/
		});
	}).delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			res.json({ message: 'Successfully deleted' });
		});
	});

	router.route('/createUser')
	.get(function(req, res) {
			if (req.session.lastPage) {	
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/createUser';
			if(req.session.loggedIn){
		      res.render('createUser');
		    }
		    else{
              res.render('notLoggedIn');
		    }
		    res.render('createUser');
	});
	
	router.route('/createPost')
    .get(function(req, res) {
    	if(req.session.loggedIn){
		  res.render('createPost');
		}
	    else{
          res.render('notLoggedIn');
	    }
  }).post(function(req, res) {
      var post = new Post();
      post.title = req.body.title;
      post.content = req.body.content;
      post.save(function(err) {
        if (err)
          res.send(err);
      	if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
		}
        res.json({ message: 'New Post Created!'});
      });
  }); 

  router.route('/managePosts')
    .get(function(req, res) {
    	if(req.session.loggedIn){
		  res.render('managePosts');
		}
	    else{
          res.render('notLoggedIn');
	    }
  	}).put(function(req, res) {
  	}).delete(function(req, res) {
  });

  router.route('/manageUsers')
    .get(function(req, res) {
      if(req.session.loggedIn){
		  res.render('manageUsers');
	  }
	  else{
	      res.render('notLoggedIn');
      }
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
			if(req.session.loggedIn){
		  		res.json(content);
			}
	        else{
	    	    res.render('notLoggedIn');
		    }
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
			if(req.session.loggedIn){
				res.render('deleteUser');
			}
			else{
				res.render('notLoggedIn');
			}
		});
	});

	router.route('deletePost/:post_id')
		.get(function(req, res) {
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			res.render('deletePost');
		})

  router.route('/postData/:post_id')
	// get the post with that id
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			res.json(post);
		});
  });

  router.route('/posts/:post_id')
	// get the post with that id
	.get(function(req, res) {
		Post.findById(req.params.post_id, function(err, post) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.render('notLoggedIn');
			}
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
				res.send(err)
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			post.title = req.body.title;
			post.content = req.body.content; 	// update the posts info
			post.save(function(err) {			// save the post
				if (err){res.send(err);}
				res.render('managePosts');
			});
		});
	}).delete(function(req, res) {
		Post.remove({
			_id: req.params.post_id
		}, function(err, post) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			res.json({ message: 'Successfully deleted' });
		});
	});



  router.route('/posts')
	.get(function(req, res) {
		Post.find({}).sort('-created_at').exec(function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
		});
	});

/*
Room.find({}).sort('-date').exec(function(err, docs) { ... });

  router.route('/posts')
    .get(function(req, res) {
      Post.find(function(err, posts) {
      if (err)
        res.send(err);
      	res.json(posts);
     });
  });
*/
  router.route('/userCreated')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/userCreated';
			if(req.session.loggedIn){
				res.render('userCreated');
			}
			else{
				res.render('notLoggedIn');
			}
  });

  router.route('/postEdited')
	.get(function(req, res) {
			if (req.session.lastPage) {
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/postEdited';
			if(req.session.loggedIn){
				res.render('postEdited');
			}
			else{
				res.render('notLoggedIn');
			}
  });

}		