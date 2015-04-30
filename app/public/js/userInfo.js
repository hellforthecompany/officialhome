(function($){
	$('a.logout').click(function(e){
    	e.preventDefault();
    	e.stopPropagation();

    	if(confirm('Are you sure you want to logout?')){
    		window.location.pathname = "/logout";
    	}else {
    		// nothing
    	}
    });
})(jQuery);