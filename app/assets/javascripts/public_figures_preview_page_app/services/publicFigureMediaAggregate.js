'use strict';

var PublicFigureMediaAggregate = function (MASTER) {
  var _path = MASTER.getPATHS( MASTER.getCONTEXT() ),
    _callback = function( data ){
      MASTER.serverResponse(data, 'thumb#set');
    },
    _pastQueries = [],
    _pastResponses = [];
  
  this.getAggregateFeeds = function( newQuery ){
    var resIndex = _.indexOf( _pastQueries, newQuery ),
      oldResponse = _pastResponses[ resIndex ];

    if ( oldResponse ) { // we have not queried this yet
      _callback( oldResponse ); 
      return;
    } 
    
    _pastQueries.push(newQuery)
    MASTER.callingServer();

    $.ajax({
      type: "POST",
      url: _path,
      data: newQuery,
      success: function(res){
        _pastResponses.push(res);
        _callback(res);
      },
      dataType: 'json'
    });
  };
}

module.exports = PublicFigureMediaAggregate;