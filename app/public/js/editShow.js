(function($){
	var wlp = window.location.pathname;
	var pathi = wlp.split("/");
	var id = pathi[2];
	var path = "/shows";
	var path2 = "/shows/" + id;
	console.log('hello');
	(function(){



		$.ajax({
			    type: 'GET',
			    dataType: "json",
			    url: path2, 
			    success: function(show) {
			    	console.log('got show');
				 /*   if(show.fname == undefined){ show.fname = ''; }
				    if(show.lname == undefined){ show.lname = ''; }
					*/

				    if(show.venue == undefined){ show.venue = ''}
				    if(show.city == undefined){ show.city = ''}
				    if(show.state == undefined){ show.state = ''}
				    if(show.zipcode == undefined){ show.zipcode = ''}
				    if(show.setlist == undefined){ show.setlist = ''}
				    if(show.members_attending == undefined){ show.members_attending = ''}
				    if(show.members_attended == undefined){ show.members_attended = ''}
				    if(show.played == undefined){ show.played = ''}
				    	console.log(show.venue);
				    if(show.venue != ''){ $('input.venue').attr('placeholder', show.venue); }
					if(show.city != ''){ $('input.city').attr('placeholder', show.city); }
					if(show.state != ''){ $('input.state').attr('placeholder', show.state); }
					if(show.zipcode != ''){ $('input.zipcode').attr('placeholder', show.zipcode); }
					if(show.selist != ''){ $('input.setlist').attr('placeholder', show.setlist); }
					if(show.members_attending != ''){ $('input.members_attending').attr('placeholder', show.members_attending); }
					if(show.members_attended != ''){ $('input.members_attended').attr('placeholder', show.members_attended); }
					if(show.played != ''){ $('input.played').attr('placeholder', show.playedPlaceholder); }

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
	*/
		var v = $('input.venue');
		var venue = $(v).val();
		var venuePlaceholder = $(v).attr('placeholder');
		if(venue == ""){ venue = venuePlaceholder = "Venue" ? "" : venuePlaceholder; }

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
		if(zipcode == ""){ zipcode = zipcodePlaceholder = "Zipcode" ? "" : zipcodePlaceholder; }

		var sl = $('textarea.setlist');
		var setlist = $(sl).val();
		var setlistPlaceholder = $(sl).attr('placeholder');
		if(setlist == ""){ selist = setlistPlaceholder = "Setlist" ? "" : setlistPlaceholder; }

		var mIng = $('input.membersAttending');
		var membersAttending = $(mIng).val();
		var mIngPlaceholder = $(mIng).attr('placeholder');
		if(membersAttending == ""){ membersAttending = mIngPlaceholder = "Members Attending" ? "" : mIngPlaceholder; }

		var mEd = $('input.membersAttended');
		var membersAttended = $(mEd).val();
		var mEdPlaceholder = $(mEd).attr('placeholder');
		if(membersAttended == ""){membersAttended = mEdPlaceholder = "Members Attended" ? "" : mEdPlaceholder; }

		var p = $('input.played');
		var played = $(p).val();
		var playedPlaceholder = $(p).attr('placeholder');
		if(played == ""){played = playedPlaceholder = "Played" ? "" : playedPlaceholder; }



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


		$.put(path2, { venue: venue, city: city, state: state, zipcode: zipcode, setlist: setlist, members_attending: membersAttending, members_attended: membersAttended, played: played }, function(result) {
   		 // do something with the results of the AJAX call
   		 	alert('success, path2: ' + path2);
   		 	alert('venue: ' + venue + ' city: ' + city + ' state: ' + state);
			alert('zipcode: ' + zipcode + ' setlist: ' +  setlist + ' mIng: ' + mIng + ' mEd: ' + mEd);
			alert('played: ' + played);
   		 	window.location.pathname = '/manageShows';
		});

	});
	


	//$('a.delete-show').attr('href', '/');


})(jQuery);