(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/usersData/" + id;
	var path2 = "/users/" + id;
	var module = {};

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
				    var password = user.password;

				    console.log('usertype: ' + userType + ' passwrd: ' + password);

				    $('input.email').attr('placeholder', email);

				    $('input.name').attr('placeholder', fullname);
				    $('input.type').attr('placeholder', userType);
				    module.getPassword = function(){
						return password;
					}
				    // $('input.password').attr('placeholder', password);
				    // $('input.password-confirm').attr('placeholder', password);
				    var pwdPlaceholder = $('input.password').attr('placeholder');

				    var apath = "/deleteUser/" + id;
				    $('a.delete-user').attr('href', apath);

				    var pwd = $('input.password').val();
					var pwdC = $('input.password-confirm').val();
					console.log('pwd: ', pwd, ' pwdC: ', pwdC, ' pwd.length: ' , pwd.length);
					console.log('get pwd: ', module.getPassword())
			   }
		});	

	})();

	$('#edit-user-form').submit(function(e){
		e.preventDefault();
		
		var em = $('input.email');
		var email = $(em).val();
		var placeholder = $(em).attr('placeholder');
		if(email == ""){
			email = placeholder == "Email" ? "" : placeholder;
		}
		
		var n = $('input.name');
		var name = $(n).val();
		var namePlaceholder = $(n).attr('placeholder');
		if(name == ""){
			name = namePlaceholder == "No Name" ? "" : namePlaceholder;
		}

		var t = $('input.type');
		var type = $(t).val();
		var typePlaceholder = $(t).attr('placeholder');
		if(type == ""){
			type = typePlaceholder == "User Type" ? "" : typePlaceholder;
		}

		var pwd = $('input.password').val();
		var pwdC = $('input.password-confirm').val();

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

		var pwdPlaceholder = $('input.password').attr('placeholder');
		var placeholderText = "Password";
		var pwdCheck = placeholderText.toLowerCase();
		//alert('pwd: ' + pwd + ' pwdC: ' + pwdC);
		if(pwd.length > 0 && pwd.length < 6){
			// IF PASSWRD ENTERED BUT TOO SHORT
			alert('password must be at least 6 characters')
		}else if(pwd.length === 0 && pwdPlaceholder.toLowerCase() === pwdCheck){
			// IF PASSWORD NOT CHANGED: SUBMIT W/OUT PASSWORD
			if(pwd === pwdC){ // MAKE SURE PLACEHOLDER MATCH TO ENSURE BOTH PASSWRD FIELD ARE EMPTY
				$.put(path2, { email: email, fname: fname, lname: lname, type: type}, function(result) {
		   		 // do something with the results of the AJAX call
		   		 	//alert('success, path2: ' + path2);
		   		 	window.location.pathname = '/manageUsers';
				});
			} else {
				alert('passwords must match!');
			}
		}else{
			// if password entered
			if(pwd.length >= 6){
				if(pwd === pwdC){
					$.put(path2, { email: email, fname: fname, lname: lname, type: type, password: pwd }, function(result) {
			   		 // do something with the results of the AJAX call
			   		 	//alert('success, path2: ' + path2);
			   		 	window.location.pathname = '/manageUsers';
					});
				} else {
					//alert('passwords must match!');
				}
			}
		}
	});
	
	var path = window.location.pathname;
	var ps = path.split('/');
	var path1 = ps[1]; 
	var path2 = ps[2];
	var p = "/deleteUser" + '/' + path2;
	//alert('hello: ' + p);

	//$('a.delete-user').attr('href', '/');


})(jQuery);