'use strict';

var usernamePotentials = function( MASTER ) {

  var _cachedLists = {
    // slightly awkward bc taken from form auto gen'd input names
    'public_figure[instagram_id]': {},
    'public_figure[facebook_id]': {}
  };
  
  this.getCachedList = function( testFor, name ){
    return _cachedLists[ testFor ][ name ];
  };

  this.getUsernameList = function( inputName, value ){
    if ( _cachedLists[ inputName ][ value ] ){
      formatAndHandoff( inputName, value, _cachedLists[ inputName ][ value ] );
    }
    var path = MASTER.getPATHS( inputName ),
      data = {
        aggregator: {
          test_string: value
        }
      };

    $.post(path, data, function(res){
      if ( res.html )
        _cachedLists[ inputName ][ value ] = res.html;

      formatAndHandoff( inputName, value, res.html );
    });
  };

  function formatAndHandoff( inputName, value, html ){
    var data = _.assign({
      html: html
    }, {
      testFor: inputName, 
      value: value
    }); 
    MASTER.serverResponse(data, 'username#check');
  }
}

module.exports = usernamePotentials;