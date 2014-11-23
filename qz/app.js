window.onload = function() {

  // Img Reference
  var img0 = "url('./imgs/drinking-glass.jpg')";
  var img1 = "url('./imgs/ethiopian-boy.jpg')";
  var img2 = "url('./imgs/hands.jpg')";
  var img3 = "url('./imgs/splash.jpg')";
  var img4 = "url('./imgs/two-glasses.jpg')";

  // Img Array 
  var slides = [img0, img1, img2, img3, img4]
  var current_slide = 0;


  $('#rightArrow').on("click", function(){
    if ((current_slide >= 0) && (current_slide < (slides.length - 1)))  {
      // Increse Slide Number
      current_slide += 1;
      // Set Slide as image
      $('#app').css({"background-image": slides[current_slide] });

    }
    else if (current_slide === (slides.length - 1)) {

    }
    else {
      alert('somethings wrong with the current_slide var in the slide generator!');
    }


  });

  $('#leftArrow').on("click", function(){
    if ((current_slide >= 1) && (current_slide <= 4))  {
      // Decrease slide number
      current_slide -= 1;
      // Set image
      $('#app').css({"background-image": slides[current_slide] });

    }
    else if (current_slide === 0) {

    }
    else {
      alert('somethings wrong with the current_slide var in the slide generator!');
    }

  });

  function rightSwipe () {

    var right_swipe_surface = document.getElementById('rightArrow'),
    startX,
    startY,
    dist, 
    threshold = 20,
    allowedTime = 400,
    elapsedTime,
    startTime;


    function callRightSwipe(swipeSuccess) {
      if (swipeSuccess) {
      
        if ((current_slide >= 0) && (current_slide < (slides.length - 1)))  {
          // Increse Slide Number
          current_slide += 1;
          // Set Slide as image
          $('#app').css({"background-image": slides[current_slide] });
        }
        else if (current_slide === (slides.length - 1)) {
        }
        else {
          alert('somethings wrong with the current_slide var in the slide generator!');
        }

      }
    }

    right_swipe_surface.addEventListener('touchstart', function(e) {
      var touchobj = e.changedTouches[0];
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();

    }, false);

    right_swipe_surface.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);

    right_swipe_surface.addEventListener('touchend', function(e) {
      var touchobj = e.changedTouches[0];
      dist = touchobj.pageX - startX;
      elapsedTime = new Date().getTime() - startTime;

      var swipeSuccess = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100 );
      callRightSwipe(swipeSuccess);
      e.preventDefault();
    }, false)

  }
  rightSwipe();




  function leftSwipe() {
    
    var left_swipe_surface = document.getElementById('leftArrow'),
    startX,
    startY,
    dist, 
    threshold = 20,
    allowedTime = 400,
    elapsedTime,
    startTime;


    function callLeftSwipe(swipeSuccess) {
      if (swipeSuccess) {

        if ((current_slide >= 1) && (current_slide <= 4))  {
          // Decrease slide number
          current_slide -= 1;
          // Set image
          $('#app').css({"background-image": slides[current_slide] });

        }
        else if (current_slide === 0) {

        }
        else {
          alert('somethings wrong with the current_slide var in the slide generator!');
        }
      }

    }

    left_swipe_surface.addEventListener('touchstart', function(e) {
      var touchobj = e.changedTouches[0];
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();

    }, false);

    left_swipe_surface.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);

    left_swipe_surface.addEventListener('touchend', function(e) {
      var touchobj = e.changedTouches[0];
      dist = startX - touchobj.pageX;
      elapsedTime = new Date().getTime() - startTime;

      var swipeSuccess = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100 );
      callLeftSwipe(swipeSuccess);
      e.preventDefault();
    }, false)

  }

  leftSwipe();
}

