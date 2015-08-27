'use strict';

var SocialMediaPopoversCtrl = function () {
  $('i.fa-question-circle').mouseover(function(){
    $(this).parents().popover('show');
  }).mouseout(function(){
    $(this).parents().popover('hide');
  });

  $('i.fa-minus-circle').mouseover(function(){
    $(this).parents().popover('show');
  }).mouseout(function(){
    $(this).parents().popover('hide');
  });
}

module.exports = SocialMediaPopoversCtrl;