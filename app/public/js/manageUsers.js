(function($){

  $.ajax({
      type: 'GET',
      dataType: "json",
      url: '/users', 
      success: function(users) {
        var p = $('div.users-content');
        users.forEach(function(user) {

          var id = user._id;
          var type = user.type;
          var email = user.email;

          p.append('<div class="user-wrap"><div class="user"><a href="/users/' + id + '" class="date">Email: ' + email + '&nbsp;&nbsp;&nbsp;&nbsp; Type: ' + type + '</h4></div></div>');
        });
        
     }
   });
})(jQuery);