(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/posts/" + id;
	console.log('hello');

	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: path, 
		    success: function(post) {
		    

		    	/*
			    $('span.email').html(email);

			    $('span.name').html(fullname);
			    $('span.type').html(postType);
			    var deletePath = "/posts/" + id;
			    $('.delete-post form').attr('action', deletePath);
			    */ 
		   }
	});	


	$(".delete-post form").submit(function(e) {
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
				window.location.pathname = '/managePosts';
				alert('Post Deleted');
			}
		});
	});
})(jQuery);