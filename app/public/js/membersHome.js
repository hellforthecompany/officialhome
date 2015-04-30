(function($){
	$(document).ready(function(e) {
	// get email list
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: '/sessionsData', 
		success: function(session) { $('h3.current-user').text(session.userEmail); }
 	  });
    });

})(jQuery);