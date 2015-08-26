'use strict';

var MyService = require('../services/publicFigureMediaAggregate.js'),
  MyQueryModel = require('../models/publicFigureQuery.js');

var SocialMediaFormController = function(MASTER){
  
  var $form = $('form#new_public_figure'),
    $inputs = $('form#new_public_figure input'),
    $actionButtons = $('form#new_public_figure [data]'),
    $collapsed = $('#collapsed-form'),
    _pastQueries = [], 
    _aggregate_service = new MyService(MASTER),
    _queryModel = new MyQueryModel();

  $inputs.keyup(function(e){
    _queryModel.update({
      name: $(e.target).attr('name'), 
      value: $(e.target).val() 
    });
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
      default:
        console.log('seems we hit a snag, no case met in SocialMediaFormController switch statement.');
    } 
  });
  
  function handlePreview(){
    var data = _queryModel.getActiveFields();
    if ( !_.isEmpty( data ) ){
      MASTER.previewClicked( proceedWPreview ); 
    } else {
      MASTER.invalidFormSubmit( $form );
    }
  }

  function handleTestUsername(e){
    var $target = $(e.target),
      testFor = $target.attr('type'),
      $parent = $target.parent();
    MASTER.testUsernameClicked( testFor, $('#' + $parent.attr('for') ).val() );
  }
  function handleUncollapse(){
    MASTER.hideThumbs();
    animateFormRedraw();
  }
  
  this.handleUsernameSelect = function( data ){
    var $input = ( data.type === 'insta' ) ? $('#public_figure_instagram_id') : $('#public_figure_facebook_id');
    $input.val('Your selected id is ' + data.id);
    $input.prop('disabled', true);
    _queryModel.update({
      name: ( data.type === 'insta' ) ? 'public_figure[instagram_id]' : 'public_figure[facebook_id]' ,
      value: data.id
    });
  };

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