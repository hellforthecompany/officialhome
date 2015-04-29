(function($){
	$(document).ready(function(e) {
	// get email list
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: '/sessionsData', 
		success: function(session) {
			console.log('session.user: ' + session.user);
		}
 	  });
    });
})(jQuery);