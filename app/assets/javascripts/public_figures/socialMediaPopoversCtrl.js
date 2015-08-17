var SocialMediaPopoversCtrl = function () {
  // this seems a little glitchy - very inconsistent starts and stops 
  // revisit uponcompletion of other pieces

  $pops = $('div[data-toggle="popover"]');
  $pops.mouseover(function(){
    $(this).popover('show');
  }).mouseout(function(){
    $(this).popover('hide');
  })
}