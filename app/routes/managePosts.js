$(document).ready(function(e) {
  console.log('blog.js loaded!!');

  function dateA(d){
    var y1 = d.charAt(0); var y2 = d.charAt(1); var y3 = d.charAt(2); var y4 = d.charAt(3);
    var m1 = d.charAt(5); var m2 = d.charAt(6);
    var d1 = d.charAt(8); var d2 = d.charAt(9);
    return m1 + m2 + '/' + d1 + d2 + '/' + y1 + y2 + y3 + y4;
  }

 // get email list
  $.ajax({
    type: 'GET',
    dataType: "json",
    url: '/posts', 
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


      console.log(posts[0].content);
      var lastIdx = posts.length;
      var last = --lastIdx;
     $('input.title').val(posts[last].title);
     $('textarea.content').val(posts[last].content);
    }
  });


});