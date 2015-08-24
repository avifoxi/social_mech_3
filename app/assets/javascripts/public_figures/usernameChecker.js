'use strict';

var usernameChecker = function( MASTER ) {

  var _pathMap = {
    'insta-username': MASTER.getPATHS('instagram_ids_from_string'),
    'facebook-username': MASTER.getPATHS('fb_id_from_string')
  };
  debugger;
  var _cachedLists = {};

  this.getUsernameList = function( $input, callback ){
    let whichStream = $input.attr('data'),
      username = $input.val(),
      path = _pathMap[ whichStream ],
      data = {
        aggregator: {
          test_string: username
        }
      };

    // alert Master that we're waiting -- placeholder
    console.log('MASTER.waiting placeholder');
    $.post(path, data, function(res){
      
      console.log('MASTER.checkPotentials placeholder');
      // handoff results to Master, disable waiting
      if ( res.html )
        _cachedLists[ username ] = res.html;
      callback(res);
    });
  };
}
module.exports = usernameChecker;