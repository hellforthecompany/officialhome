(function($){

	$.ajax({
		    type: 'GET',
		    dataType: "json",
		    url: '/shows', 
		    success: function(shows) {
		      var p = $('div.shows-content');
		      shows.forEach(function(show) {
		      //  if (show.fname && show.lname === "undefined" || "null" || "") {
		      //    show.fname = "Unknown"
		      //  };
		      var id = show._id;
		      var rawC = show.venue;
		      var city = show.city;

		      if (city === "") {city = "Untitled";}

		      p.append('<div class="show-wrap"><div class="show"><a href="/shows/' + id + '" class="date">Title: ' + city + '&nbsp;&nbsp;&nbsp;&nbsp; Id: ' + id + '</h4></div></div>');
		     // console.log(content);	
		      });
		      
		   }
		});

})(jQuery);