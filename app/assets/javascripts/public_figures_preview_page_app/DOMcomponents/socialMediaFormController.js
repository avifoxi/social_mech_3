'use strict';

var MyService = require('../services/publicFigureMediaAggregate.js'),
  MyQueryModel = require('../models/publicFigureQuery.js');

var SocialMediaFormController = function(MASTER){
  
  var $form = $('form#new_public_figure'),
    $inputs = $('form#new_public_figure input'),
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
  
  $('[data="preview"]').click(function(e){
    e.preventDefault();
    var data = _queryModel.getActiveFields();

    if ( !_.isEmpty( data ) ){
      MASTER.previewClicked( function(){
        proceedWPreview();
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

  function proceedWPreview(){
    var newQuery = _queryModel.getActiveFields(),
      weAlreadyQueriedThis = _.find(_pastQueries, function(old){
        return _.isEqual( old, newQuery );
      });

    if ( !weAlreadyQueriedThis ) {
      _pastQueries.push(newQuery)
      _aggregate_service.getAggregateFeeds( newQuery );
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