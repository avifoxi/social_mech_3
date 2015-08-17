var SocialMediaPopoversCtrl = function () {
  // this seems a little glitchy - very inconsistent starts and stops 
  // revisit uponcompletion of other pieces

  $pops = $('div[data-toggle="popover"]');

  $('input').mouseover(function(){
    window.$tester = $(this);
    $(this).parents().popover('show');
  }).mouseout(function(){
    $(this).parents().popover('hide');
  });


  // $pops.mouseover(function(){
  //   $(this).popover('show');
  // }).mouseout(function(){
  //   $(this).popover('hide');
  // });
}