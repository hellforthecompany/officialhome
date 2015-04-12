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

		    console.log(user);
		    console.log('hello!!');
		    var email = user.email;
		    $('input.email').attr('placeholder', email);
		    console.log('email: ' + email);

		   }
	});	

})(jQuery);