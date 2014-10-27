exports = module.exports = function( router, EmailList ) {

	// *"middleware"* - something that happens ON EVERY REQUEST
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
			EmailList.find(function(err, members) {
			if(err)
				res.send(err);
			//res.json(members);
			res.render('index', {
				members: members
			});
		});
	/*
		.post(function(req, res) {
			var member = new EmailList();
			member.email = req.body.email;
			member.fname = req.body.fname;
			member.lname = req.body.lname;

			member.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: "Thank you! You've been succesfully added to the email list!"});
			});
		}); 
	*/
}