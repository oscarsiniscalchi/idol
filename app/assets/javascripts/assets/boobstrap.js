var boobstrap = {
  
  view_port: function() {
    var handheld_min= 0;
    var handheld_max= 479;
    var handheld_landscape_min= 480;
    var handheld_landscape_max= 767;
    var small_screen= 768;
    var default_screen= 980;
    var medium_screen= 1280;
    var large_screen_min= 1250;
    var large_screen_max= 1800;
    var high_ress_min= 1801;
    var high_ress_max= 6000;
    
    var width = $(window).width();
  	if (width <= handheld_max) {
      console.log("Handheld");
      $('body').removeClass().addClass('h');
    }
    else if (width <= handheld_landscape_max && width >= handheld_landscape_min) {
      console.log("Handheld Landscape");
      $('body').removeClass().addClass('hl');
    }
    else if (width <= large_screen_max && width >= large_screen_min) {
      console.log("Large screen");
      $('body').removeClass().addClass('large');
  	}
    else if (width < default_screen && width >= small_screen) {
      console.log("Tablet Portrait");
      $('body').removeClass().addClass('tp');
    }
    else if (width >= default_screen) {
      console.log("Default Sreen");
      $('body').removeClass().addClass('d');
    }
  //window dimension
  },
  
  init: function() {
    var body= $('body').attr('class');
    if (body == "h") {
      topBar.init($('div.top-nav'));
    } else {
      topBar.reset();
    } //h
  }//init

}//boobstrap
$(document).ready(function() {
  boobstrap.view_port();
  boobstrap.init();
  navBar.init($('.navbar'));
  goToAnchor.init($('.goto'));
});//DOM

$(window).load(function() {
});

$(window).resize(function() {
  $.doTimeout( 'resize', 250, function(){
    boobstrap.view_port();
    var body= $('body').attr('class');
    if (body == "h") {
      topBar.init($('div.top-nav'));
    } else {
      topBar.reset();
    } //h
  });// trigger events only once !!
  
});