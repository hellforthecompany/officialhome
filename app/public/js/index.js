(function($){

	$('.email-list-signup .close').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$('.email-list-signup, form#email-list-signup > .create-member').toggleClass('closed');
		$(this).toggleClass('closed');
	});		


	$(document).ready(function() {


		  $.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: '/posts', 
		    success: function(posts) {
		      var p = $('.index .posts'); 
		      p.append('<h2 class="posts-header">News</h2>');
		      posts.forEach(function(post) {
		      //  if (post.fname && post.lname === "undefined" || "null" || "") {
		      //    post.fname = "Unknown"
		      //  };
		      var date = dateConvert(post.created_at);
		      var rawC = post.content;

		      p.append('<div class="post-wrap"><div class="post"><h4 class="date">Posted: ' + date + '</h4>' + rawC + '<div class="borders"></div></div></div><hr>');
		     // console.log(content);	
		      });
		      
		   }
		});
	});


	function dateConvert(d){
    var y1 = d.charAt(0); var y2 = d.charAt(1); var y3 = d.charAt(2); var y4 = d.charAt(3);
    var m1 = d.charAt(5); var m2 = d.charAt(6);
    var d1 = d.charAt(8); var d2 = d.charAt(9);
    return m1 + m2 + '/' + d1 + d2 + '/' + y1 + y2 + y3 + y4;
  }



})(jQuery);