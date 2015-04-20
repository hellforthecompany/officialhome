(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/usersData/" + id;
	var path2 = "/users/" + id;
	console.log('hello');
	(function(){



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

	})();

	$('#edit-user-form').submit(function(e){
		e.preventDefault();
		
		var e = $('input.email');
		var email = $(e).val();
		var placeholder = $(e).attr('placeholder');
		if(email == ""){
			email = placeholder == "Email" ? "" : placeholder;
		}
		
		var n = $('input.name');
		var name = $(n).val();
		var namePlaceholder = $(n).attr('placeholder');
		if(name == ""){
			name = namePlaceholder == "Name" ? "" : namePlaceholder;
		}

		var t = $('input.type');
		var type = $(t).val();
		var typePlaceholder = $(t).attr('placeholder');
		if(type == ""){
			type = typePlaceholder == "User Type" ? "" : typePlaceholder;
		}


		function _ajax_request(url, data, callback, method) {
		    return jQuery.ajax({
		        url: url,
		        type: method,
		        data: data,
		        success: callback
		    });
		}

		jQuery.extend({
		    put: function(url, data, callback) {
		        return _ajax_request(url, data, callback, 'PUT');
		}});

		var fullName = name.split(' ');
		var fname = fullName[0];
		var lname = fullName[1];

		$.put(path2, { email: email, fname: fname, lname: lname, type: type }, function(result) {
   		 // do something with the results of the AJAX call
   		 	alert('success');
   		 	window.location.pathname = '/manageUsers';
		});
		

	});


})(jQuery);