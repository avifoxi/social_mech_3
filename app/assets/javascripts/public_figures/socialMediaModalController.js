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
      case 'user#error':
        prepareErrorModal(modelAction);
        break;
    }
  }

  function prepareErrorModal(modelAction){
    $title.html('You fucked everything up!');
    // $body.html( _views[modelAction] );
    $footer.html('');

    // currently no custom options!
    $modal.modal(_options);
    showUserErrors('user[name]');
  };

  function prepareNewUserModal(modelAction){ 
    // set template contents for this context
  	$title.html('Like what you see?');
  	$body.html( _views[modelAction] );
    $footer.html('');

    // currently no custom options!
    $modal.modal(_options);

    attachFormListener();
  };
  function attachFormListener(){
    $('.modal form').submit(function(e){
      e.preventDefault();
      var missingFields = validUser( e.target );
      if ( _.isEmpty( missingFields ) ){
        allowSubmit(e); // somehow passing the event wakes it up ... this is confusing        
      } else {
        showUserErrors(missingFields);
      }
    });
  };
  function allowSubmit(e){
    var data = $(e.target).serialize(),
      url = e.target.action;
    $.post(url, data);

    fadeBetweenInnerContents($('#solicit'), _views['thanks-for-submission']);

    setTimeout(function(){
      $modal.modal('hide');
      MASTER.resume();
    }, 1500);  
  };

  function showUserErrors(missingFields){
    var errorView = _views['user#error'],
      fieldToEng = {
        'user[name]': 'name',
        'user[email]': 'email'
      },
      missingFields = _.map(missingFields, function(f){
        return fieldToEng[f];
      }),
      errors = missingFields.join(' and ');

    fadeBetweenInnerContents($('#solicit'), errorView);
    $('span.form-errors').html(errors);
    
    $('.modal a.btn-warning').click(function(e){
      e.preventDefault();
      fadeBetweenInnerContents($('#validationErrors'), _views['user#new'], attachFormListener);
    });
  };

  function fadeBetweenInnerContents($old, newer, callback){
    $old.animate({
      height: "toggle"
    }, 500, function(){
      $(this).remove(); // inefficient--- get it up then refactor
    });
    $body.append(newer).fadeIn(300);
    if ( callback ){
      callback();
    }
  };

  function validUser(form){
    var fields = $( form ).serializeArray(),
      invalids = [];
    // 0 => utf code, 1 => name, 2 => email
    // slightly smarter email validation
    _.each(fields, function(field){
      if ( field.value === '' ){
        invalids.push(field.name);
      }
    });
    return invalids;
  };
}