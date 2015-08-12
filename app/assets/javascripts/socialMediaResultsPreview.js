var SocialMediaResultsPreview = function(PATHS){
  var $form = $('form'),
    $collapsed = $('#collapsed-form'),
    $waitingIcon = $('.fa-refresh'),
    $thumbsGrid = $('.masonryGrid'),
    _previewModel = undefined,
    _waitingForServer = false,
    _thumbsShowing = false,
    _thumbnailCtrl = new SocialMediaThumbnailController(PATHS, 'preview');

  _thumbnailCtrl.init();

  // # TODO -- this kinda sucks fix in morning
  $thumbsGrid.hide();
  
  $('[data="preview"]').click(function(e){
    var formData = $form.serialize();

    e.preventDefault();
    // if the user has changed their data... not a thorough validation, but a hint in that direction
    if ( _previewModel !== formData ) {
       _previewModel = formData;
       postPreviewGetMedia( _previewModel );
    } else {
      toggleShowThumbs();
    }
    
    animateFormCollapse()
  });

  $('[data="unCollapse"]').click(function(){
    animateFormRedraw();
  })
  
  this.showThumb = function (){
    return _thumbnailCtrl;
  }

  function toggleShowThumbs(){
    _thumbsShowing = !_thumbsShowing;
    if ( _thumbsShowing ){
      $thumbsGrid.show();
    } else {
      $thumbsGrid.hide();
    }
  }

  function postPreviewGetMedia(data){
    var callback = handoffToThumbNailController;
    
    // ajax call works, now work on animating collapse
    $.ajax({
      type: "POST",
      url: PATHS.preview,
      data: data,
      success: function(res){
        toggleShowThumbs();
        callback(res);
        toggleWaiting(); 
      },
      dataType: 'json'
    });
  };
  function handoffToThumbNailController(previewMedia){
    _thumbnailCtrl.setPublicFigure(previewMedia);
  };
  function animateFormCollapse(){
    // console.log('should be animate?')
    $form.animate({
      opacity: 0.25,
      height: "toggle"
    }, 1000);
    $collapsed.show(500);
    toggleWaiting();
  };
  function toggleWaiting(){
    var animateClass = 'icon-refresh-animate';
    _waitingForServer = !_waitingForServer;
    if ( _waitingForServer ){
      $waitingIcon.addClass(animateClass);
      $waitingIcon.parent().show(400);
    } else {
      $waitingIcon.removeClass(animateClass);
      $waitingIcon.parent().hide(400);
    }
  };
  function animateFormRedraw(){
    $collapsed.hide(500);
    $form.animate({
      opacity: 1,
      height: "toggle"
    }, 1000);
  };
}