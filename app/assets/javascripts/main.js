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
    var current = 0;
    var itemW = galW;

    function moveSlider (to) {

      var previousActual = $slider.find('.actual').index();
      var nextActual;
      var next;
      var offset = -(itemW * to);
      var destination_index;
      var duration = 850;
      var default_css = {
        right: -200,
        opacity: 0
      };

      if (to < 0 || to >= amount){
        // RESET
        $slider.animate(
          { left: 0 },
          duration,
          function() {
            $('.actual').removeClass('actual');
            current = 0;
            $($('.item')[current]).addClass('actual');
          }
        );
      }else{
        $slider.animate(
          { left: offset },
          duration,
          function() {
            $('.actual').removeClass('actual');
            current = to;
            $($('.item')[current]).addClass('actual');
          }
        );
        paralaxAnimate($($('.item')[to]).addClass('actual'), false);
        paralaxAnimate($($('.item')[current]).addClass('actual'), default_css);
      }
    }; // Move Slider
    paralaxAnimate($($('.item')[current]).addClass('actual'), false);

    function paralaxAnimate(item, default_data){
      $('.paralax', item).each(function(){
        var data_params = default_data;
        if(!data_params){
          data_params = $(this).data();
        };
        $(this).animate(
          data_params,
          $(this).data('duration'),
          function() {
          }
        );
      })
    };

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
