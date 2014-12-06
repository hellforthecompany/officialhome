$(document).ready(function(e) {

	// get email list
	$.ajax({
		type: 'GET',
		dataType: "json",
		url: '/emailListData', 
		success: function(members) {
			members.forEach(function(member) {
			//	if (member.fname && member.lname === "undefined" || "null" || "") {
			//		member.fname = "Unknown"
			//	};
				$('#result').append("<li> Name " + member.fname + 
					" " + member.lname + "<br>" + "Email: " + member.email + "</li>" );
			});

		}


	});

	// post new users to email list
	$("form#emailListSignup").submit(function(e) {

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
				$('#createMemberSuccess').html('Succesfully added to the email list!');
				$('.create-member input.input').val('');
				$("#result").html(returnhtml);
			}
		});
	});

/*
	$("form#login").submit(function(e) {
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
				console.log('Succesfully added user!');
			}
		});
	});
*/

	$("form#createUser").submit(function(e) {
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
				console.log('Succesfully added user!');
			}
		});
	});



	$('.login-btn').click(function(e) {
		e.preventDefault();
		$('.login-form').css({'display': 'inline-block'});
	});

	$('.close-btn').click(function(e) {
		e.preventDefault();
		$('.login-form').css({'display': 'none'});
	});







});