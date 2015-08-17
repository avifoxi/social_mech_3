function SocialMediaModalCtrl(MASTER){
	_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var $modal = $('.modal'),
    $title = $('.modal-title'),
    $body = $('.modal-body'),
    $footer = $('.modal-footer'),
    _views = {
      'user#new': undefined,
      'thanks-for-submission': undefined,
      'user#error': undefined
    },
		_options = {};

	// anticipating multiple contexts for modal usage
	
  getViewsFromDom();

 	this.show = function(modelAction){
    parseContent(modelAction)
 	};

  function getViewsFromDom(){
    var keys = Object.getOwnPropertyNames( _views );
    _.each(keys, function(key){
      _views[key] = $( '[data-modal-contents="' + key + '"]').html();
    });
  }

  function parseContent(modelAction){
    switch ( modelAction ){
      case 'user#new':
        prepareNewUserModal(modelAction);
        break;
    }
  }

  function prepareNewUserModal(modelAction){ 
    // set template contents for this context
  	$title.html('Like what you see?');
  	$body.html( _views[modelAction] );
    $footer.html('');

    // currently no custom options!
    $modal.modal(_options);

    $('.modal form').submit(function(e){
      e.preventDefault();
      var missingFields = validUser( e.target );
      if ( _.isEmpty( missingFields ) ){
        allowSubmit(e); // somehow passing the event wakes it up ... this is confusing        
      } else {
        console.log('should not submit');
      }
    });
  };

  function allowSubmit(e){
    var data = $(e.target).serialize(),
      url = e.target.action;

    console.log('adat :::::' + data);
    console.log('url :::: ' + url);
    $('#solicit').animate({
      height: "toggle"
    }, 500);
    $thankYou = _views['thanks-for-submission'];
    $body.append($thankYou).fadeIn(300);
    setTimeout(function(){
      $modal.modal('hide');
      MASTER.resume();
    }, 1500); 
    $.post(url, data);
  };

  function validUser(form){
    var fields = $( form ).serializeArray(),
      invalids = [];
    // 0 => utf code, 1 => name, 2 => email
    _.each(fields, function(field){
      if ( field.value === '' ){
        invalids.push(field.name);
      }
    });
    return invalids;
  }
}