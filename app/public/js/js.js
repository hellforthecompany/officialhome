$(document).ready(function(e) {

	$('.login-btn').click(function(e) {
		e.preventDefault();
		$('.login-form').css({'display': 'inline-block'});
	});

	$('.close-btn').click(function(e) {
		e.preventDefault();
		$('.login-form').css({'display': 'none'});
	});


});