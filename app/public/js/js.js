(function($){
	$(document).ready(function(e) {

		$('.login-btn').click(function(e) {
			e.preventDefault();
			$('.login-form').css({'display': 'inline-block'});
		});

		$('.close-btn').click(function(e) {
			e.preventDefault();
			$('.login-form').css({'display': 'none'});
		});

		var scrollHeight = $('#body-wrap').scrollTop();
		var scrollNewHeight;
		$('#body-wrap').bind('scroll', function(){
			scrollNewHeight = $(this).scrollTop();
			if(scrollHeight < scrollNewHeight){
				console.log('going down');
				$('.customNav').addClass('small');
			}else{
				console.log('going up');
				$('.customNav').removeClass('small');
			}

			scrollHeight = scrollNewHeight;
			// console.log('this.scrollTop(): ');
			// console.log($(this).scrollTop());
		});


	}); 
})(jQuery);