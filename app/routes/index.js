exports = module.exports = function( router, EmailList ) {

	router.use(function(req, res, next) {
		// do logging
		console.log('request issued!');
		next(); // make sure we go to the next routes and don't stop here
	});


	router.get('/', function(req, res) {
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

	router.route('/music')
	.get(function(req, res) {
  	  res.render('music');
	});

	router.route('/tour')
	.get(function(req, res) {
  	  res.render('tour');
	});

	router.route('/more')
	.get(function(req, res) {
  	  res.render('more');
	});

	router.route('/about-contact')
	.get(function(req, res) {
  	  res.render('about');
	});



}		