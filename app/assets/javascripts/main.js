
//Here goes your code for the project

$(document).ready(function() {
  
  $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  appendIconNames(["social","common", "enclosed"]);
  
});//DOM ready

function appendIconNames(sets) {
  $.each(sets, function(index, set) {
    $('.icons-content-'+set+' ul li i').each(function() {
      var prefix = $(this).attr('class');
      $(this).parent().append('<p>'+prefix+'</p>')
    });
  });
  
}//Append icons name