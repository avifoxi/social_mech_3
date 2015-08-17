var PreviewPageMaster = function(PATHS){
  // component oriented JS separation of concerns
  // this is the master controller for Preview page

  // Constants
  var CONTEXT = 'preview',
    PATHS = PATHS, // redundant - but passed in and don't want to forget

    // Component Controllers - initialized in private function
    _ThumbnailCtrl = {},
    _ModalCtrl = {},
    _FormCtrl = {},
    _WaitingCtrl = {}, // this is animated refresh icon overlay

    // Master State Variables
    _formShowing = true,
    _thumbsShowing = true, // even though thumbnails not rendered, the mount node is present in DOM
    _waitingForServer = false,
    _modalShowing = false,
    _previewFreebieCount = 0,
    _callbackToBeResumed = undefined, // master can pass actions to children, and cache callback. when MASTER.resume() is triggered by child, callback is run
    _self = this;

  /*
  *   PUBLIC METHODS
  *
  */ 
  
  // Debugging Methods -- for accessing components in Dev Console
  this.showThumb = function (){
    return _ThumbnailCtrl;
  };
  this.showModal = function (){
    return _ModalCtrl;
  };
  this.showForm = function(){
    return _FormCtrl;
  };
  this.showWaiting = function(){
    return _WaitingCtrl;
  };

  // GETTER FUNCTIONS
  this.getPATHS = function(subpath){
    return subpath ? PATHS[subpath] : PATHS;
  };
  this.getCONTEXT = function(){
    return CONTEXT;
  };

  // EVENT REPORTING
  this.previewClicked = function(){
    ++_previewFreebieCount;
    console.log(_previewFreebieCount);
    if ( _previewFreebieCount === 2 ){
      _ModalCtrl.show('user#new');
      _callbackToBeResumed = handlePreview;
      return;
    }
    handlePreview();
  };
  this.hideThumbs = function(){
    _thumbsShowing = false;
    toggleThumbs();
  };
  this.callingServer = function(){
    _waitingForServer = true;
    toggleWaiting();
  };
  this.serverResponse = function(data){
    _waitingForServer = false;
    toggleWaiting();
    if ( data ) {
      _ThumbnailCtrl.setPublicFigure(data);
      _thumbsShowing = true;
      toggleThumbs();
    } else {

    }
  };
  this.resume = function(){
    if ( _callbackToBeResumed ){
      _callbackToBeResumed();
    }
  };
  /*
  *   PRIVATE METHODS
  *
  */  
  
  function init(){
    _ThumbnailCtrl = new SocialMediaThumbnailController(_self);
    _ModalCtrl = new SocialMediaModalCtrl(_self);
    _FormCtrl = new SocialMediaFormController(_self);
    _WaitingCtrl = new SocialMediaWaitingController();
    _ThumbnailCtrl.init();
  }

  function toggleModal(type){
    // if ( _previewFreebieCount > 1 ){
      _ModalCtrl.show();
    // }
  }

  function toggleWaiting(){
    if ( _waitingForServer ){
      _WaitingCtrl.show();
    } else {
      _WaitingCtrl.hide();
    }
  }

  function toggleThumbs(){
    if ( _thumbsShowing ){
      _ThumbnailCtrl.show();
    } else {
      _ThumbnailCtrl.hide();
    }
  }

  function handlePreview(){   
    _thumbsShowing = true;
    toggleThumbs();
  }

  init();
}