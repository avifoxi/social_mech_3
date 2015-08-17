var SocialMediaFormController = function(MASTER){
  
  var $form = $('form#new_public_figure'),
    $collapsed = $('#collapsed-form'),
    _path = MASTER.getPATHS( MASTER.getCONTEXT() ),
    _previewModel = undefined;
  
  $('[data="preview"]').click(function(e){
    e.preventDefault();
    var formData = $form.serialize();

    if ( isValid(formData) ){
      MASTER.previewClicked();
      // if the user has changed their data... 
      // TODO - add a thorough validation
      if ( _previewModel !== formData ) {
        _previewModel = formData;
        postPreviewGetMedia( _previewModel );
      } 
      animateFormCollapse();
    } else {
      alert('what the fuck did you do?');
    }
  });

  $('[data="unCollapse"]').click(function(){
    MASTER.hideThumbs();
    animateFormRedraw();
  })
  
  function postPreviewGetMedia(data){
    var callback = MASTER.serverResponse;
    MASTER.callingServer();

    $.ajax({
      type: "POST",
      url: _path,
      data: data,
      success: function(res){
        callback(res);
        window.previewJson = JSON.stringify(res);
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