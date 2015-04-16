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

			    $('span.email').html(email);

			    $('span.name').html(fullname);
			    $('span.type').html(userType);
			    var deletePath = "/users/" + id;
			    $('.delete-user form').attr('action', deletePath);
		   }
	});	


	$(".delete-user form").submit(function(e) {
		console.log('submit fired');
		e.preventDefault();

		var form_data = $(this).serialize();
		var form_url = $(this).attr("action");
		var form_method = $(this).attr("method").toUpperCase();
		$.ajax({
			url: form_url,
			type: form_method,
			data: form_data,
			cache: false,
			success: function(returnhtml) {
				window.location.pathname = '/manageUsers';
				alert('User Deleted');
			}
		});
	});
})(jQuery);