'use strict';

var ThumbnailController    = require('./DOMcomponents/socialMediaThumbnailController.js'),
  ModalCtrl                = require('./DOMcomponents/socialMediaModalController.js'),
  FormController           = require('./DOMcomponents/socialMediaFormController.js'),
  WaitingController        = require('./DOMcomponents/socialMediaWaitingCtrl.js'),
  PopoversCtrl             = require('./DOMcomponents/socialMediaPopoversCtrl.js'),
  usernamePotentials       = require('./services/usernamePotentials.js');

var PreviewPageMaster = function(PATHS){
  // component oriented JS separation of concerns
  // this is the master controller for Preview page

  // Constants
  var CONTEXT = 'preview',
    PATHS = PATHS, // redundant - but passed in and don't want to forget

    // Component Controllers - initialized in private function
    _ThumbnailCtrl      = {},
    _ModalCtrl          = {},
    _FormCtrl           = {},
    _WaitingCtrl        = {}, // animated refresh icon overlay
    _PopoverCtrl        = {}, // popover instructions for form inputs, on hover over questions

    // Services -- tools to get stuff, ajax etc
    _usernamePotentials = {},

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
  this.exposeUsernamePotentials = function(){
    return _usernamePotentials;
  }

  // GETTER FUNCTIONS
  this.getPATHS = function(subpath){
    return subpath ? PATHS[subpath] : PATHS;
  };
  this.getCONTEXT = function(){
    return CONTEXT;
  };

  // EVENT REPORTING
  this.previewClicked = function(callback){
    ++_previewFreebieCount;
    if ( _previewFreebieCount === 2 ){
      _ModalCtrl.show('user#new');
      
      _callbackToBeResumed = function(){
        handlePreview(callback);
      };
    } else {
      handlePreview(callback);
    }
  };
  this.hideThumbs = function(){
    _thumbsShowing = false;
    toggleThumbs();
  };
  this.callingServer = function( callbackToCache ){
    if ( callbackToCache ){
      _callbackToBeResumed = callbackToCache;
    }
    _waitingForServer = true;
    toggleWaiting();
  };
  this.serverResponse = function(data, type){
    _waitingForServer = false;
    toggleWaiting();
    if ( type ===  'username#check' ){
      _FormCtrl.enableUserIdChanges( data );
    }
    else if ( data ) {
      _ThumbnailCtrl.setPublicFigure(data);
      _thumbsShowing = true;
      toggleThumbs();
    } else {

    }
    if ( _callbackToBeResumed ){
      resumeCallback( data )
    }
  };
  this.revealUsernameList = function(data){
    var list = _usernamePotentials.getCachedList( _.keys(data)[0], _.values(data)[0] );
    _ModalCtrl.show('username#check', {html: list});
  };
  this.resume = function(data){
    resumeCallback( data )
  };
  this.invalidFormSubmit = function( form ){
    _ModalCtrl.show('user#error', form);
  };
  this.testUsernameClicked = function( testFor, value ){
    _usernamePotentials.getUsernameList( testFor, value );
  };
  this.usernameSelected = function( data ){
    _FormCtrl.handleUsernameSelect( data );
  };
  this.requestTwoStepValidation = function( input, url ){
    _usernamePotentials.getUsernameList( input.name(), input.getValue() );
  };
  this.showUserNameOptions = function( input ){
    var list = _usernamePotentials.getCachedList( input.name(), input.getValue() ); 
    _ModalCtrl.show('username#check', {html: list, testFor: input.name() });
  };
  /*
  *   PRIVATE METHODS
  *
  */
  function resumeCallback( data ){
    if ( _callbackToBeResumed ){
      _callbackToBeResumed( data );
      _callbackToBeResumed = undefined; // clear the cache after callback
    }
  }  
  
  function init(){
    _ThumbnailCtrl      = new ThumbnailController( _self );
    _ModalCtrl          = new ModalCtrl( _self );
    _FormCtrl           = new FormController( _self );
    _WaitingCtrl        = new WaitingController();
    _PopoverCtrl        = new PopoversCtrl();
    _usernamePotentials = new usernamePotentials( _self );
    
    _ThumbnailCtrl.init();
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

  function handlePreview(callback){
    if ( callback ){
      callback();
    }   
    _thumbsShowing = true;
    toggleThumbs();
  }

  init();
}

module.exports = PreviewPageMaster;