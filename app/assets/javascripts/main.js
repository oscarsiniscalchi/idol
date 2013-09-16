var main = {

  Parallax: function() {
    var ua = navigator.userAgent,
        isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

      if (isMobileWebkit) {
        $('html').addClass('mobile');
      }

      $(function(){
        var iScrollInstance;

        if (isMobileWebkit) {
          iScrollInstance = new iScroll('gallery');

          $('#scroller').stellar({
            scrollProperty: 'transform',
            positionProperty: 'transform',
            horizontalOffset: 0,
            verticalOffset: 0,
            horizontalScrolling: true,
            verticalScrolling: false,
            hideDistantElements: false
          });
        } else {
          $.stellar({
            horizontalScrolling: true,
            verticalScrolling: false,
            hideDistantElements: false,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: false
          });
        }
      });
  },//init

  gallery: function() {
    var $gal = $('#gallery');
    var galW = $gal.width();
    var $slider = $gal.find('.slides');
    var $item = $slider.find('.item');
    var amount = $item.length;
    $slider.css('width', galW*amount);
    $item.css('width', galW);
    var current = 1;
    var itemW = galW;

    function moveSlider (where) {

      var increase = -(itemW);
      var decrease = +(itemW);
      var previousActual = $slider.find('.actual').index();
      var nextActual;
      var next;
      var offset;
      if (where > current) {
        offset = increase;
        nextActual = previousActual+1;
        next = current+1;
      } else if (where < current) {
        offset = decrease;
        nextActual = previousActual-1;
        next = current-1;
      }
      var duration = 300;

      if (current==1 && next<=current || current>=amount) {
        $slider.animate({
          left: 0},
          duration, function() {
          current = 1;
          $item.removeClass('actual');
          $item.eq(0).addClass('actual');
        });
      }; //if current is greater than amount of items

      if (current>1 && current<amount || next>current && current==1) {
        $slider.animate({
          left: (offset*nextActual)},
          duration, function() {
            $item.removeClass('actual');
            $item.eq(nextActual).addClass('actual');
            current = next;
        });
      }; //gap in which we will trigger the animation

    }; // Move Slider
    $('a.arrow-r').click(function (e) {
      e.preventDefault();
      moveSlider(current+1);
    });
    $('a.arrow-l').click(function (e) {
      e.preventDefault();
      moveSlider(current-1);
    });

  },

  masonryGallery: function() {
    var $container = $('div.contestants-list');
      $container.masonry({
        itemSelector: '.person',
        gutter: 20
      });
  }

}//boobstrap
$(document).ready(function() {
  main.Parallax();
  main.gallery();
  main.masonryGallery();
});//DOM

$(window).load(function() {
});

$(window).resize(function() {
  $.doTimeout( 'resize', 250, function(){
  });// trigger events only once !!
});