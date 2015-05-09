(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/emailListData/" + id;
	var deletePate = "/emailListData/" + id;
	//var path2 = "/users/" + id;
	console.log('hello');
	$('form#edit-member-form').attr('action', path);
	$('form#delete-member-form').attr('action', path);
	(function(){



		$.ajax({
			    type: 'GET',
			    dataType: "json",
			    url: path, 
			    success: function(member) {
			    
			    	alert('success');
				    if(member.fname == undefined){ member.fname = ''; }
				    if(member.lname == undefined){ member.lname = ''; }

				    var email = member.email;
				//    var fullname = member.fname + ' ' + member.lname;

				//    if(fullname == ' '){ fullname = 'No Name'; }

				    $('input.email').attr('placeholder', email);

				 //   $('input.name').attr('placeholder', fullname);
				 //   $('input.type').attr('placeholder', userType);

				  //  var apath = "/deleteUser/" + id;
				    console.log('apath: ' + apath);
				    $('a.delete-user').attr('href', apath);

			   }
		});	

	})();

	$('#edit-member-form').submit(function(e){
		alert('submit fired');
		e.preventDefault();
		
		var em = $('input.email');
		var email = $(em).val();
		var placeholder = $(em).attr('placeholder');
		if(email == ""){
			email = placeholder == "Email" ? "" : placeholder;
		}
		

		var n = $('input.fname');
		var name = $(n).val();
		var namePlaceholder = $(n).attr('placeholder');
		if(name == ""){
			name = namePlaceholder == "No Name" ? "" : namePlaceholder;
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

		$.put(path2, { email: email, fname: name }, function(result) {
   		 // do something with the results of the AJAX call
   		 	alert('success, path2: ' + path2);
   		 	window.location.pathname = '/emailList';
		});

	});
	

	$("form#delete-member-form").submit(function(e) {
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
				alert('Member Deleted');
				window.location.pathname = '/emailList';
			}
		});
	});

	
	var path = window.location.pathname;
	var ps = path.split('/');
	var path1 = ps[1]; 
	var path2 = ps[2];
	var p = "/deleteUser" + '/' + path2;
	alert('hello: ' + p);

	//$('a.delete-user').attr('href', '/');


})(jQuery);