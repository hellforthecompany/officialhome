$(document).ready(function(e) {
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
});