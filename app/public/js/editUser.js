(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/usersData/" + id;
	console.log('hello');
	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: path, 
		    success: function(user) {
		    
			    if(user.fname == undefined){ user.fname = ''; }
			    if(user.lname == undefined){ user.lname = ''; }

			    var email = user.email;
			    var fullname = user.fname + ' ' + user.lname;

			    if(fullname == ' '){ fullname = 'No Name'; }
			    var userType = user.type;
			    console.log('usertype: ' + userType);

			    $('input.email').attr('placeholder', email);

			    $('input.name').attr('placeholder', fullname);
			    $('input.type').attr('placeholder', userType);

			    var apath = "/deleteUser/" + id;
			    console.log('apath: ' + apath);
			    $('a.delete-user').attr('href', apath);

		   }
	});	

	

})(jQuery);