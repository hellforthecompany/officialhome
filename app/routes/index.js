exports = module.exports = function( router, EmailList, User, Post, Show, bcrypt ) {

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


	});

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
		//	member.lname = req.body.lname;
			member.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Thank you! You have been succesfully added to the email list!'});
			});
	  }).get(function(req, res) {
			EmailList.find({}, function(err, members) {
			if (err)
				res.send(err);
			// if(req.session.loggedIn){
				res.json(members);
			// }
			// else{
			// 	res.render('notLoggedIn');
			// }
		});
	});



	  

	router.route('/emailListData/:emailList_id')
	.get(function(req, res) {
		var content;
		EmailList.findById(req.params.emailList_id, function(err, emailList) {
			if (err)
				res.send(err);
			content = emailList;
			if (req.session.lastPage) {
					console.log('Last Page: ' + req.session.lastPage);
			}
			if(req.session.loggedIn){
		  		res.render('editEmailListMember');
			}
	        else{
	    	    res.render('notLoggedIn');
		    }
		});
	}).put(function(req, res) {
	// find the post
		EmailList.findById(req.params.emailList_id, function(err, listMember) {	
			console.log('called');
			if (err)
				res.send(err)
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			listMember.email = req.body.email;
			listMember.fname = req.body.fname; 	// update the listMembers info
			listMember.save(function(err) {			// save the post
				if (err)
					res.send(err);
				res.render('emailList');
			});
		});
	}).delete(function(req, res) {
		EmailList.remove({
			_id: req.params.emailList_id
		}, function(err, member) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			res.json('emailList');
		});
	});



	router.route('/usersDB')
	.get(function(req, res) {
			User.find({}, function(err, users) {
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
		User.find({}, function(err, users) {
			if (err)
				res.send(err);
			//if(req.session.loggedIn){
		      res.json(users);
		    // }
		    // else{
      //         res.render('notLoggedIn');
		    // }
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
			//if(req.session.loggedIn){
		      res.render('editUser');
		    //}
		    // else{
      //         res.render('notLoggedIn');
		    // }
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
			// if(!req.session.loggedIn){
			// 	res.redirect('notLoggedIn');
			// }
			user.password = req.body.password;
			console.log('user.password: ', user.password);
			if(user.password && user.password !== ""){
				bcrypt.genSalt(10, function(err, salt) {
			    	bcrypt.hash(user.password, salt, function(err, hash) {
			   			 // Store hash in your password DB. 
			    		console.log('password hashing!');

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
			}else{
				user.email = req.body.email;
				user.fname = req.body.fname;
				user.lname = req.body.lname; 	// update the users info
				user.type = req.body.type;


				user.save(function(err) {			// save the user
					if (err){res.send(err);}
					res.render('manageUsers');
				});
			}

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
		//  
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


  router.route('/createShow')
	.get(function(req, res) {
			if (req.session.lastPage) {	
				console.log('Last Page: ' + req.session.lastPage);
			}
			req.session.lastPage = '/createShow';
			if(req.session.loggedIn){
		      res.render('createShow');
		    }
		    else{
              res.render('notLoggedIn');
		    }
	}).post(function(req, res) {
      var show = new Show();
      show.venue = req.body.venue;
      show.city = req.body.city;
      show.state = req.body.state;
      show.zipcode = req.body.zipcode;
      show.setlist = req.body.setlist;
      show.members_attending = req.body.members_attending;
      show.members_attended = req.body.members_attended;
      show.date = req.body.date;
      show.created_at = req.body.created_at;
      show.last_updated = req.body.last_updated;
      show.played = req.body.played;
      show.save(function(err) {
        if (err)
          res.send(err);
      	if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
		}
        res.json({ message: 'New Show Created!'});
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
			//if(req.session.loggedIn){
		  		res.json(content);
			//}
	     //    else{
	    	//     res.render('notLoggedIn');
		    // }
		});
	});

	router.route('/deletePost/:post_id')
		.get(function(req, res) {
			Post.findById(req.params.post_id, function(err, user) {	
				if(err)
					res.send(err);
				if(req.session.lastPage) {
					console.log('Last Page: ' + req.session.lastPage);
				}
				if(req.session.loggedIn){
					res.render('deletePost');
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
			else{
			res.json({ message: 'Successfully deleted' });
			}
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


  router.route('/shows/:show_id')
	// get the show with that id
	.get(function(req, res) {
		Show.findById(req.params.show_id, function(err, show) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.render('notLoggedIn');
			}
			res.render('editShow');
		});
	}).post(function(req, res) {
		Show.findById(req.params.show_id, function(err, show) {
			if (err)
				res.send(err)
			show.title = req.body.title;
			show.content = req.body.content;
		});
	}).put(function(req, res) {
	// find the show
		Show.findById(req.params.show_id, function(err, show) {	
			if (err)
				res.send(err)
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			show.venue = req.body.venue;
			show.city = req.body.city; 	// update the shows info
			show.state = req.body.state;
			show.zipcode = req.body.zipcode;
			show.setlist = req.body.setlist;
			show.members_attended = req.body.members_attended;
			show.members_attending = req.body.members_attending;
			show.played = req.body.played;
			//show.last_updated = Date.now;
			show.save(function(err) {			// save the show
				if (err)
					res.send(err);
				res.render('manageShows');
			});
		});
	}).delete(function(req, res) {
		Show.remove({
			_id: req.params.show_id
		}, function(err, show) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.redirect('notLoggedIn');
			}
			else{
			res.json({ message: 'Successfully deleted' });
			}
		});
	});


  router.route('/shows')
	.get(function(req, res) {
		Show.find({}, function(err, shows) {
			if (err)
				res.send(err);
			if(req.session.loggedIn){
		      res.json(shows);
		    }
		    else{
              res.render('notLoggedIn');
		    }
		 });
	});

  router.route('/manageShows')
    .get(function(req, res) {
      if(req.session.loggedIn){
		  res.render('manageShows');
	  }
	  else{
	      res.render('notLoggedIn');
      }
  });


  router.route('/showsData/:show_id')
	// get the show with that id
	.get(function(req, res) {
		Show.findById(req.params.show_id, function(err, show) {
			if (err)
				res.send(err);
			if(!req.session.loggedIn){
				res.render('notLoggedIn');
			}
			res.json(show);
		});
	})

/*
Room.find({}).sort('-date').exec(function(err, docs) { ... });

  router.route('/posts')
    .get(function(req, res) {
      Post.find({}, function(err, posts) {
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