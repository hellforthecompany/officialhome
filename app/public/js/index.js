(function($){

	$(document).ready(function() {


		  $.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: '/posts', 
		    success: function(posts) {
		      
		      $('.index .posts').append('<h2 class="posts-header">News</h2>');
		      posts.forEach(function(post) {
		      //  if (post.fname && post.lname === "undefined" || "null" || "") {
		      //    post.fname = "Unknown"
		      //  };
		      var content = $.parseHTML(post.content);
		      $('.index .posts').append(content);
		      console.log(content);	
		      });
		      
		   }
		});
	});


})(jQuery);