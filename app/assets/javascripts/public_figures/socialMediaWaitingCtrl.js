var SocialMediaWaitingController = function () {
  var $body = $('body'),
    _waitingHtml = $.parseHTML( $.trim( $('#waiting-icon' ).html() ) ),
    _addedToDom = false;

  this.hide = function(){
    $( _waitingHtml ).fadeOut(400);
  };
  this.show = function(){
    if ( !_addedToDom ){
      $body.append(_waitingHtml).fadeIn(400);
      _addedToDom = true;
    } else {
      $(_waitingHtml).fadeIn(400);
    } 
  };
}