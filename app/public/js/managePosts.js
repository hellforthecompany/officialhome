(function($){

	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: '/posts', 
		    success: function(posts) {
		      var p = $('div.posts-content');
		      posts.forEach(function(post) {
		      //  if (post.fname && post.lname === "undefined" || "null" || "") {
		      //    post.fname = "Unknown"
		      //  };
		      var id = post._id;
		      var rawC = post.content;
		      var title = post.title;

		      if (title === "") {title = "Untitled";}

		      p.append('<div class="post-wrap"><div class="post"><a href="/posts/' + id + '" class="date">Title: ' + title + '&nbsp;&nbsp;&nbsp;&nbsp; Id: ' + id + '</h4></div></div>');
		     // console.log(content);	
		      });
		      
		   }
		});

})(jQuery);