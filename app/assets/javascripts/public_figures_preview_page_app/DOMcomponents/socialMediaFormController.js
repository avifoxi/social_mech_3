'use strict';

var MyService = require('../services/publicFigureMediaAggregate.js'),
  MyQueryModel = require('../models/publicFigureQuery.js'),
  Validator = require('../utils/realTimeValidator.js'),
  iconHelper = require('./form_helpers/formStatusIconHelper.js');

var SocialMediaFormController = function(MASTER){
  
  var $form = $('form#new_public_figure'),
    $inputs = $('form#new_public_figure input'),
    $actionButtons = $('form#new_public_figure [data]'),
    $collapsed = $('#collapsed-form'),
    _pastQueries = [], 
    _aggregate_service = new MyService( MASTER ),
    _queryModel = new MyQueryModel(), 
    _validator = new Validator( $inputs, MASTER ),
    _iconHelper = new iconHelper();

  // Add Listeners on text input, focus out, and action button hits

  $inputs.keyup(function(e){
    updateQueryModel(e);
  });
  $inputs.focusin(function(e){
    updateQueryModel(e);
  }); 
  $inputs.focusout(function(e){
    var key = $(e.target).attr('name'),
      input = _queryModel.getInputField( key ),
      callback = function(){
        handleValidStatusOf( input );
      };
    _validator.check( input, callback );    
  });

  $('.form-group').click(function(e){
    handleInputClick(e);
  });

  $actionButtons.click(function(e){
    e.preventDefault();
    switch( $(e.target).attr('data') ) {
      case 'preview': 
        handlePreview();
        break;
      case 'test-username':
        handleTestUsername(e);
        break;
      case 'unCollapse':
        handleUncollapse();
        break;
      case 'toggle-active':
        handleToggleActive(e);
        break;
      default:
        console.log('seems we hit a snag, no case met in SocialMediaFormController switch statement.');
    } 
  });

  // Public Functions -- explicitly triggerable by Master Controller

  this.handleUsernameSelect = function( data ){
    var $input = $inputs.filter(function(index, ip){ 
      return $( ip ).attr('name') === data.type;
    });
    $input.val('Your selected id is ' + data.id);
    $input.prop('disabled', true);
    _queryModel.update({
      name: data.type,
      value: data.id
    });
  };

  this.enableUserIdChanges = function( data ) {
    var input = _queryModel.getInputField( data.testFor );
    
    input.setValidity(false, 'select');
    handleValidStatusOf( input )
  };

  // Internal Component Events -- triggered by Form UI

  function handleValidStatusOf( input ){
    var icon = _iconHelper( input ),
      myIp =  _.find($inputs, function(ip){ 
        return $(ip).attr('name') === input.name();
      });
    
    $(myIp).closest('td').siblings().html( $( icon).fadeIn(1000)  );
    
    if ( input.getValidState()['INVALID'] === 'select' ) {
      // attach listener to select expand icon click
      $( icon ).click(function(e){
        e.preventDefault();
        MASTER.showUserNameOptions( input );
      });
    }
  }
  function handleInputClick(e){
    var $t = $( e.target )
    if ( $t.prop('disabled') === true ){
      $t.prop('disabled', false);
      $t.val('');
    }     
  };
  function updateQueryModel(e){
    _queryModel.update({
      name: $(e.target).attr('name'), 
      value: $(e.target).val() 
    });
  }
  function handleToggleActive(e){
    var $target = $(e.target),
      inputId = $target.closest('label').attr('for'),
      $input = $('#' + inputId ),
      name = $input.attr('name'),
      hidden = $input.data('hidden') ? $input.data('hidden') : false;

    $input.data('hidden', !hidden);
    
    if ( $input.data('hidden') ) {
      _queryModel.removeFromActive(name);
      $input.hide(250);
      $target.removeClass('fa-minus-circle').addClass('fa-plus-circle');
    } else {
      _queryModel.returnToActive(name);
      $input.show(250);
      $target.removeClass('fa-plus-circle').addClass('fa-minus-circle');
    }
  };
  
  function handlePreview(){
    var data = _queryModel.getActiveFields();
    if ( !_.isEmpty( data ) ){
      MASTER.previewClicked( proceedWPreview ); 
    } else {
      MASTER.invalidFormSubmit( $form );
    }
  };

  function handleTestUsername(e){
    var $target = $(e.target),
      testFor = $target.attr('type'),
      labelForChildID = $target.parent().attr('for'),
      $input = $('#' + labelForChildID);

    if ( $target.data( 'changeQueryName' ) ){
      $input.attr('disabled', false).val('');
      $target.data('changeQueryName', null).text('Get User ID');
      $target.siblings('button[type="' + testFor + '"]')
        .remove();
    } else {
      MASTER.testUsernameClicked( testFor, $input.val() );
    }
  };
  function handleUncollapse(){
    MASTER.hideThumbs();
    animateFormRedraw();
  };
  // proceed w preview should actually be a public function, triggered from master after checking against freebie count
  function proceedWPreview(){
    var newQuery = _queryModel.getActiveFields(),
      weAlreadyQueriedThis = _.find(_pastQueries, function(old){
        return _.isEqual( old, newQuery );
      });

    if ( !weAlreadyQueriedThis ) {
      _pastQueries.push(newQuery)
      _aggregate_service.getAggregateFeeds( newQuery );
      _queryModel = new MyQueryModel();
    } else {
      console.log( 'TELL MASTER TO SHOW THE OLD QUERY' );
      console.log( weAlreadyQueriedThis );
    }
    animateFormCollapse();
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
}

module.exports = SocialMediaFormController;