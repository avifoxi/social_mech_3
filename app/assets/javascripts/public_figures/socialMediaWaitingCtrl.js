'use strict';

var SocialMediaWaitingController = function () {
  var $body = $('body'),
    _waitingHtml = $.parseHTML( $.trim( $('#waiting-icon' ).html() ) );

    // the html is within script tags, so not active in dom on page load
    // hence lag on icon display when querying server, and need to add then quickly hide
  $body.append(_waitingHtml);
  $(_waitingHtml).hide();

  this.hide = function(){
    $( _waitingHtml ).fadeOut(400);
  };
  this.show = function(){
    $(_waitingHtml).fadeIn(400);
  };
}

module.exports = SocialMediaWaitingController;