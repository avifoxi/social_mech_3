'use strict';

var SocialMediaFormController = function(MASTER){
  
  var $form = $('form#new_public_figure'),
    $collapsed = $('#collapsed-form'),
    _path = MASTER.getPATHS( MASTER.getCONTEXT() ),
    _previewModel = undefined;
  
  $('[data="preview"]').click(function(e){
    e.preventDefault();
    var formData = $form.serialize();

    if ( isValid(formData) ){
      MASTER.previewClicked( function(){
        proceedWPreview(formData);
      }); 
    } else {
      MASTER.invalidFormSubmit( $form );
    }
  });

  $('button[data="test-username"]').click(function(e){
    e.preventDefault();
    var testFor = $(this).attr('type');
    // parent is the label for the form input -- and it's 'for' attr
    // corresponds to id of input val we want
    var parent = $(this).parent();
    MASTER.testUsernameClicked( testFor, $('#' + parent.attr('for') ).val() );
  });

  $('[data="unCollapse"]').click(function(){
    MASTER.hideThumbs();
    animateFormRedraw();
  });

  function proceedWPreview(formData){
    if ( _previewModel !== formData ) {
      _previewModel = formData;
      postPreviewGetMedia( _previewModel );
    } 
    animateFormCollapse();
  };
  
  function postPreviewGetMedia(data){
    var callback = MASTER.serverResponse;
    MASTER.callingServer();

    $.ajax({
      type: "POST",
      url: _path,
      data: data,
      success: function(res){
        callback(res);
      },
      dataType: 'json'
    });
  };
  
  function animateFormCollapse(){
    $form.animate({
      opacity: 0.25,
      height: "toggle"
    }, 1000);
    $collapsed.show(500);
  };
  function animateFormRedraw(){
    $collapsed.hide(500);
    $form.animate({
      opacity: 1,
      height: "toggle"
    }, 1000);
  }; 
  function isValid(formData){
    var regEx,
      splat;
    regEx = new RegExp(/[= &]/);
    splat = formData.split(regEx);
    // in other words, if the form data contains no empty strings
    if ( splat.indexOf('') === -1 ){
      return true;
    }
  }
}

module.exports = SocialMediaFormController;