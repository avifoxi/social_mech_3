'use strict';

var MyService = require('../services/publicFigureMediaAggregate.js'),
  MyQueryModel = require('../models/publicFigureQuery.js'),
  Validator = require('../utils/realTimeValidator.js');

var SocialMediaFormController = function(MASTER){
  
  var $form = $('form#new_public_figure'),
    $inputs = $('form#new_public_figure input'),
    $actionButtons = $('form#new_public_figure [data]'),
    $collapsed = $('#collapsed-form'),
    _pastQueries = [], 
    _aggregate_service = new MyService( MASTER ),
    _queryModel = new MyQueryModel(), 
    _validator = new Validator( $inputs, MASTER );

  // Add Listeners on text input, focus out, and action button hits

  $inputs.keyup(function(e){
    updateQueryModel(e)
  });
  $inputs.focusin(function(e){
    updateQueryModel(e)
  }); 
  function updateQueryModel(e){
    _queryModel.update({
      name: $(e.target).attr('name'), 
      value: $(e.target).val() 
    });
  }

  $inputs.focusout(function(e){
    var key = $(e.target).attr('name'),
      input = _queryModel.getInputField( key ),
      callback = function(){
        handleValidStatusOf( input );
      };
    _validator.check( input, callback );      
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

  this.awaitingResponseOn = function( input ){

  };

  this.handleUsernameSelect = function( data ){
    var $input = ( data.type === 'insta' ) ? $('#public_figure_instagram_id') : $('#public_figure_facebook_id');
    $input.val('Your selected id is ' + data.id);
    $input.prop('disabled', true);
    _queryModel.update({
      name: ( data.type === 'insta' ) ? 'public_figure[instagram_id]' : 'public_figure[facebook_id]' ,
      value: data.id
    });
  };

  this.enableUserIdChanges = function( data ) {
    var type = data.testFor;
    var littleButt = $('[data="test-username"][type="' + type + '"]');
    var $clone = $( $.clone(littleButt[0]) )
      .attr('data', null)
      .data('revealUsernameList', {[type]: data.value})
      .text('Choose another match for ' + data.value );
    littleButt
      .after( $clone )
      .data('changeQueryName', true)
      .text('Redo search with another name ');
    
    // and attach listener to new button
    $clone.click(function(e){
      e.preventDefault();
      var data = $(this).data( 'revealUsernameList' );
      MASTER.revealUsernameList( data )
    });
  };

  // Internal Component Events -- triggered by Form UI

  function handleValidStatusOf( input ){
    console.log( this );
    console.log( 'input status post validation' );
    console.log( input.getValidState())
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