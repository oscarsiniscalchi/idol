//Vars
var open =false;
var $top_bar = $('div.top-nav');
var top_barH = $top_bar.height();
var itemH = $top_bar.find('ul.items').height();
var $tigger_topbar = $top_bar.find('.toggle-topbar');

var topBar = {

  init : function($top_bar) {
    //console.log("Top Nav Initialized");
    $tigger_topbar.removeClass('inactive');
    $tigger_topbar.click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      itemH = $top_bar.find('ul.items').height();
      if (open==false) {
        if ($('body').hasClass('h')) {
          $top_bar.animate({'height': itemH+top_barH}, 300, function() {
            open=true;
          });
        } else {
          $top_bar.animate({'height': itemH}, 300);
        }
        
      } else {
        $top_bar.animate({'height': top_barH}, 300, function() {
          open=false;
        });
      }//else
    });//trigger click
  //init
  },
  
  reset : function() {
    $top_bar.animate({'height': top_barH}, 200, function() {
      open=false;
      $tigger_topbar.addClass('inactive');
    });
  }//reset
  
}//top bar

var navBar = {
  init : function($navbar) {
    $navbar.each(function(index) {
      var subCat = $(this).find('li > .sub-cat');
      subCat.each(function(index) {
        var $navbar = $(this).parents('.navbar');
        if ($navbar.length) {
          
          if ($navbar.hasClass('sidebar') && $(this).prev('a').hasClass('selected')) {
            $navbar.find('a.selected').next(subCat).addClass('active');
          };//if sidebar
          
          // HOVER TOP NAV
          if ($navbar.hasClass('top-nav')) {
            function hideSubMenu () {
              if ($navbar.find('.sub-cat').hasClass('active')) {
                $(this).find('a').first().trigger('click');
              };
            };
            function doNothing () {};
            var config = {    
                   over: doNothing,   
                   timeout:500, 
                   out: hideSubMenu  
                };
            $navbar.find('li > .sub-cat').parent().hoverIntent( config );
          };//top nav
          
          $(this).find('a').each(function() {
            $(this).click(function(e) {
              e.stopPropagation();
              if ($(this).parents('.top-nav').length) {
                $(this).parents('ul').prev('a').trigger('click');
              }
              if ($(this).parents('.sidebar').length) {
                subCat.find('a').removeClass('selected');
                $(this).addClass('selected');
               }//if
            });
          });//subcat links click
          $(this).prev('a').each(function(index) {
            
            $(this).click(function(e) {
              subCat = $(this).next('.sub-cat');
              e.preventDefault();
              e.stopPropagation();
              if (subCat.hasClass('active')) {
                subCat.removeClass('active');
                if ($(this).parents('.navbar').hasClass('top-nav')) {
                  itemH = $top_bar.find('ul.items').outerHeight();
                  if ($('body').hasClass('h')) {
                    $top_bar.animate({'height': itemH+top_barH}, 300);
                  } else {
                    $top_bar.animate({'height': itemH}, 300);
                  }
                }//if topbar
              } else {
                subCat.addClass('active');
                if ($(this).parents('.navbar').hasClass('top-nav')) {
                  itemH = $top_bar.find('ul.items').outerHeight();
                  if ($('body').hasClass('h')) {
                    $top_bar.animate({'height': itemH+top_barH}, 300);
                  } else {
                    $top_bar.animate({'height': itemH}, 300);
                  }
                }//if topbar
              }
            });//subCat Click
            
          });//each item with subcats
          
        }//if navbar exists
      });//each subcat
    });
    
  }//init
}//navbars both top and side
