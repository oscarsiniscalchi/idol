// ANIMATE ANCHOR TO ELEMENTS

var goToAnchor = {
  init : function($trigger) {
    $trigger.click(function(e) {
      var ref = $(this).attr('href').split('#');
      var target = ("#"+ref[1]);
      var url = ref[0];
      var pathname = window.location.pathname;
      if (url == pathname) {
         e.preventDefault();
         e.stopPropagation();
         if (target== "#top") {
           $(window).scrollTo(0, 800 );
         } else {
           $(window).scrollTo( target, 1000, {offset:-50}, {axis:'y'} );
         }
      };
    });
  }//init
}//goto anchor