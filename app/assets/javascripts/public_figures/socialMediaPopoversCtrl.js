var SocialMediaPopoversCtrl = function () {
  $('#new_public_figure input').mouseover(function(){
    $(this).parents().popover('show');
  }).mouseout(function(){
    $(this).parents().popover('hide');
  });
}