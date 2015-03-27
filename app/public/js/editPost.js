(function($){

/*
	var wysiwyg_args = {
		    "autoresize": true,
		    "resize": false,
//		    "imageUpload": "\/admin\/img\/add",
		    "bodyClass": "_-wsyiwyg CKEditorInputArea CKEditorGeneratedContent RTEGeneratedContent"
		};


	CKEDITOR.replace(document.getElementById('content'),wysiwyg_args);
	console.log('stuff',document.getElementById('content'),CKEDITOR); 
*/	
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/postsData/" + id;

	alert(path);

	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: path, 
		    success: function(posts) {
		      var p = $('div.posts-content');
		     /* posts.forEach(function(post) {
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
		     */
		     console.log('firing!');
		     console.log(posts.content); 
		   }
		});	

//	("form#createUser").submit(function(e) {
//		var data = CKEDITOR.instances.editor1.getData();
//		console.log('data');
//	});

})(jQuery);