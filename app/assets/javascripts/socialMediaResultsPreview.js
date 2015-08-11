var SocialMediaResultsPreview = function(previewUrl){
  var $form = $('form'),
    $collapsed = $('#collapsed-form'),
    $waitingIcon = $('.fa-refresh'),
    _waitingForServer = false;

  $collapsed.hide();

  $('[data="preview"]').click(function(e){
    e.preventDefault();
    // postPreviewGetMedia($form.serialize());
    animateFormCollapse()
  });

  $('[data="unCollapse"]').click(function(){
    animateFormRedraw();
  })
  
  function postPreviewGetMedia(data){
    // var callback = handoffToThumbNailController;
    
    // ajax call works, now work on animating collapse
    // $.ajax({
    //   type: "POST",
    //   url: previewUrl,
    //   data: data,
    //   success: function(res){
    //     callback(res);
    //     toggleWaiting(); 
    //   },
    //   dataType: 'json'
    // });
  };
  function handoffToThumbNailController(json){
    // console.log(json)
    // window.previewJSON = json;
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
    } else {
      $waitingIcon.removeClass(animateClass);
    }
  };
  function animateFormRedraw(){
    $collapsed.hide(500);
    $form.animate({
      opacity: 1,
      height: "toggle"
    }, 1000);
    toggleWaiting();
  };
}