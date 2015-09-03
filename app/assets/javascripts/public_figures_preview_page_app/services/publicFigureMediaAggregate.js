'use strict';

var PublicFigureMediaAggregate = function (MASTER) {
  var _path = MASTER.getPATHS( MASTER.getCONTEXT() ),
    _callback = function( data ){
      MASTER.serverResponse(data, 'thumb#set');
    };
 
  this.getAggregateFeeds = function( data ){
    MASTER.callingServer();

    $.ajax({
      type: "POST",
      url: _path,
      data: data,
      success: function(res){
        _callback(res);
      },
      dataType: 'json'
    });
  };
}

module.exports = PublicFigureMediaAggregate;