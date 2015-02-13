/// 


//  THIS NEEDS TO BE EDITED - THIS IS A RAW COPY FROM TYLERDINNER.COM AS OF NOW


/////
$(document).ready(function(e) {
  console.log('blog.js loaded!!');

  function dateA(d){
    var y1 = d.charAt(0);
    var y2 = d.charAt(1);
    var y3 = d.charAt(2);
    var y4 = d.charAt(3);

    var m1 = d.charAt(5);
    var m2 = d.charAt(6);

    var d1 = d.charAt(8);
    var d2 = d.charAt(9);

    return m1 + m2 + '/' + d1 + d2 + '/' + y1 + y2 + y3 + y4;
  }

 // get email list
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: '/blogData', 
    success: function(posts) {
      $('#result').append('<h2 class="posts-header">All Posts</h2>')
      posts.forEach(function(post) {
      //  if (post.fname && post.lname === "undefined" || "null" || "") {
      //    post.fname = "Unknown"
      //  };
        $('#result').append('<li class="blog-posts"><span class="created-at">' + dateA(post.created_at) + 
          '</span><span class="title">' + post.title + 
          '</span><hr><div class="content">' + post.content + "</div></li>" );
      });

    }


  });







  // post new users to email list
  $("form#createPost").submit(function(e) {

    e.preventDefault();

    var form_data = $(this).serialize();
    var form_url = $(this).attr("action");
    var form_method = $(this).attr("method").toUpperCase();

    $.ajax({
      url: form_url,
      type: form_method,
      data: form_data,
      cache: false,
      success: function(returnhtml) {
       // fill empty success alert div
       // $('#createMemberSuccess').html('Succesfully added to the email list!');
       // clear input fields
       // $('.create-member input.input').val('');
       // post results into current page 
        $("#result").html(returnhtml);
        alert('success!!');
      }
    });
  });


});