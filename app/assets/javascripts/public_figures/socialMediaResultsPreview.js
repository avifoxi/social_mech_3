// var SocialMediaResultsPreview = function(PATHS){
//   var $form = $('form'),
//     $collapsed = $('#collapsed-form'),
//     $waitingIcon = $('.fa-refresh'),
//     _previewModel = undefined,
//     _waitingForServer = false,
//     _thumbsShowing = true,
//     _thumbnailCtrl = new SocialMediaThumbnailController(PATHS, 'preview'),
//     _modalCtrl = new SocialMediaModalCtrl('preview');

//   // CURRENTLY THE THUMBNAIL NEEDS TO HAVE INIT CALLED TO GET TEMPLATES --- 
//   // PERHAPS REFACTOR AS SINGLETON
//   _thumbnailCtrl.init();

//   $('[data="preview"]').click(function(e){
//     var formData = $form.serialize();

//     e.preventDefault();
//     // if the user has changed their data... not a thorough validation, but a hint in that direction
//     if ( _previewModel !== formData ) {
//        _previewModel = formData;
//        _waitingForServer = true;
//        toggleWaiting();
//        postPreviewGetMedia( _previewModel );
//     } 
//     animateFormCollapse()
//   });

//   $('[data="unCollapse"]').click(function(){
//     animateFormRedraw();
//   })
  
//   this.showThumb = function (){
//     return _thumbnailCtrl;
//   }
//   this.showModal = function (){
//     return _modalCtrl;
//   }

  
//   function toggleShowThumbs(){
//     _thumbsShowing = !_thumbsShowing;
//     if ( _thumbsShowing && _thumbnailCtrl.$grid ){
//       _thumbnailCtrl.$grid.show();
//     } else {
//       _thumbnailCtrl.$grid.hide();
//     }
//   };
//   function toggleWaiting(){
//     if ( _waitingForServer ){
//       $waitingIcon.parent().show(400);
//     } else {
//       $waitingIcon.parent().hide(400);
//     }
//   };

//   function postPreviewGetMedia(data){
//     var callback = handoffToThumbNailController;
    
//     // ajax call works, now work on animating collapse
//     $.ajax({
//       type: "POST",
//       url: PATHS.preview,
//       data: data,
//       success: function(res){
//         // toggleShowThumbs();
//         _waitingForServer = false;
//         callback(res);
//         toggleWaiting(); 
//       },
//       dataType: 'json'
//     });
//   };
//   function handoffToThumbNailController(previewMedia){
//     _thumbnailCtrl.setPublicFigure(previewMedia);
//   };
//   function animateFormCollapse(){
//     $form.animate({
//       opacity: 0.25,
//       height: "toggle"
//     }, 1000);
//     $collapsed.show(500);

//     if ( !_thumbsShowing ){
//       toggleShowThumbs();
//     }
//   };
//   function animateFormRedraw(){
//     $collapsed.hide(500);
//     $form.animate({
//       opacity: 1,
//       height: "toggle"
//     }, 1000);
//     if ( _waitingForServer ){
//       toggleWaiting();
//     }
//     toggleShowThumbs();
//   };
  
  
// }