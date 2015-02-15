(function($){

	$(document).ready(function () { 
		var wysiwyg_args = {
		    "autoresize": true,
		    "resize": false,
//		    "imageUpload": "\/admin\/img\/add",
		    "bodyClass": "_-wsyiwyg CKEditorInputArea CKEditorGeneratedContent RTEGeneratedContent"
		};

		CKEDITOR.replace(document.getElementById('content'),wysiwyg_args);
		console.log('stuff',document.getElementById('content'),CKEDITOR); 
		
		
	}); 

	("form#createUser").submit(function(e) {
		var data = CKEDITOR.instances.editor1.getData();
		console.log('data');
	});


})(jQuery);

