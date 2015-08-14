var SocialMediaWaitingController = function () {
  var $waiting = $('.icon-refresh');

  this.hide = function(){
    $waiting.hide(400);
  };
  this.show = function(){
    $waiting.show(400);
  };
}