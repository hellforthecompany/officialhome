(function($){

  $(document).ready(function () { 
	var wysiwyg_args = {
		    "autoresize": true,
		    "resize": false,
//		    "imageUpload": "\/admin\/img\/add",
		    "bodyClass": "_-wsyiwyg CKEditorInputArea CKEditorGeneratedContent RTEGeneratedContent"
		};

		var editor = CKEDITOR.replace(document.getElementById('content'),wysiwyg_args);
		console.log('stuff',document.getElementById('content'),CKEDITOR); 
		
		var data = editor.getData();
		console.log('data' + data);
		
	}); 

//	$("form#createPost").submit(function(e) {
//		var data = CKEDITOR.instances.editor1.getData();
//		alert('data: ' +  data);
//	});


})(jQuery);

