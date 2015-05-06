(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/shows/" + id;
	var path2 = "/shows/" + id;
	console.log('hello');
	(function(){



		$.ajax({
			    type: 'GET',
			    dataType: "json",
			    url: path, 
			    success: function(show) {
			    
				    if(show.fname == undefined){ show.fname = ''; }
				    if(show.lname == undefined){ show.lname = ''; }

				    var email = show.email;
				    var fullname = show.fname + ' ' + show.lname;

				    if(fullname == ' '){ fullname = 'No Name'; }
				    var showType = show.type;
				    console.log('showtype: ' + showType);

				    $('input.email').attr('placeholder', email);

				    $('input.name').attr('placeholder', fullname);
				    $('input.type').attr('placeholder', showType);

				    var apath = "/deleteShow/" + id;
				    console.log('apath: ' + apath);
				    $('a.delete-show').attr('href', apath);

			   }
		});	

	})();

	$('#edit-show-form').submit(function(e){
		e.preventDefault();
	/*	
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
			type = typePlaceholder == "Show Type" ? "" : typePlaceholder;
		}
	*/
		var v = $('input.venue');
		var venue = $(v).val();
		var venuePlaceholder = $(v).attr('placeholder');
		if(venue == ""){
			venue = venuePlaceholder = "Venue" ? "" : venuePlaceholder;
		}

		var c = $('input.city');
		var city = $(c).val();
		var cityPlaceholder = $(c).attr('placeholder');
		if(city == ""){ city = cityPlaceholder = "City" ? "" : cityPlaceholder; }

		var s = $('input.state');
		var state = $(s).val();
		var statePlaceholder = $(s).attr('placeholder');
		if(state == ""){ state = statePlaceholder = "State" ? "" : statePlaceholder; }

		var z = $('input.zipcode');
		var zipcode = $(z).val();
		var zipcodePlaceholder = $(z).attr('placeholder');
		if(zipcode == ""){ zipcode = zipcodePlaceholder = "Zipcode" : zipcodePlaceholder; }

		var sl = $('textarea.setlist');
		var setlist = $(sl).val();
		var setlistPlaceholder = $(sl).attr('placeholder');
		if(setlist == ""){ selist = setlistPlaceholder = "Setlist" : setlistPlaceholder; }

		var mIng = $('input.membersAttending');
		var membersAttending = $(mIng).val();
		var mIngPlaceholder = $(mIng).attr('placeholder');
		if(membersAttending = ""){ membersAttending = mIngPlaceholder = "Members Attending" : mIngPlaceholder; }

		var mEd = $('input.membersAttended');
		var membersAttended = $(mEd).val();
		var mEdPlaceholder = $(mEd).attr('placeholder');
		if(membersAttended = ""){membersAttended = mEdPlaceholder = "Members Attended" : mEdPlaceholder; }

		var p = $('input.played');
		var played = $(p).val();
		var playedPlaceholder = $(p).attr('placeholder');
		if(played = ""){played = playedPlaceholder = "Played" : playedPlaceholder; }

	//	var pwd = $('input.password').val();
	//	var pwdC = $('input.password-confirm').val();
	//  alert('pwd: ' + pwd + ' pwdC: ' + pwdC);

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



		if(pwd === pwdC){
			$.put(path2, { venue: venue, city: city, state: state, zipcode: zipcode, setlist: setlist, members_attending: members_attending, members_attended: members_attended, played: played }, function(result) {
	   		 // do something with the results of the AJAX call
	   		 	alert('success, path2: ' + path2);
	   		 	window.location.pathname = '/manageShows';
			});
		} else {
			alert('passwords must match!');
		}
	});
	


	//$('a.delete-show').attr('href', '/');


})(jQuery);