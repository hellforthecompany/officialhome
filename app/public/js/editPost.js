(function($){
	var path = window.location.pathname;
	var pathi = path.split("/");
	var id = pathi[2];
	path = "/postData/" + id;
	var path2 = "/posts/" + id;
	var title;
	var content;
	var editor;
 	(function(){

 	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: path, 
		    success: function(post) {
		    var wysiwyg_args = {
		    "autoresize": true,
		    "resize": false,
		    "bodyClass": "_-wsyiwyg CKEditorInputArea CKEditorGeneratedContent RTEGeneratedContent"
		    };

		    var content = post.content;
		    var c = document.getElementById('content');
			editor = CKEDITOR.replace(c,wysiwyg_args);
			var data = editor.setData(post.content);

			$('input#post-title').val(post.title);

		   }
		});
	

 	})();
	

 	$('#edit-post-form').submit(function(e){
		e.preventDefault();
		var postTitle = $('input#post-title').val();
		content = editor.getData();


		function _ajax_request(url, data, callback, method) {
		    return jQuery.ajax({
		        url: url,
		        type: method,
		        data: data,
		        success: callback
		    });
		}

		jQuery.extend({
		    put: function(url, data, callback) {
		        return _ajax_request(url, data, callback, 'PUT');
		}});

		$.put(path2, { title: postTitle, content: content }, function(result) {
   		 // do something with the results of the AJAX call
   		 	window.location.pathname = '/managePosts';
		});


	});


})(jQuery);