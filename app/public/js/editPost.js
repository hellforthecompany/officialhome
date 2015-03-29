(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/postsData/" + id;

	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: path, 
		    success: function(post) {
		    var wysiwyg_args = {
		    "autoresize": true,
		    "resize": false,
//		    "imageUpload": "\/admin\/img\/add",
		    "bodyClass": "_-wsyiwyg CKEditorInputArea CKEditorGeneratedContent RTEGeneratedContent"
		    };

		    var content = post.content;
		    var c = document.getElementById('content');
			var editor = CKEDITOR.replace(c,wysiwyg_args);
			var data = editor.setData(post.content);

			var titleElement = document.getElementById('post-title');
			var title = post.title;
			titleElement.placeholder = title; 
			var form = document.getElementById('edit-post-form');
			form.action = path;
			console.log(title);
		   }
		});	

})(jQuery);