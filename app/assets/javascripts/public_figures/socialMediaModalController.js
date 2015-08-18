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

 	this.show = function(modelAction, data){
    // if ( !data ){
    //   data = null;
    // }
    parseContent(modelAction, data)
 	};

  function getViewsFromDom(){
    var keys = Object.getOwnPropertyNames( _views );
    _.each(keys, function(key){
      _views[key] = $( '[data-modal-contents="' + key + '"]').html();
    });
  }

  function parseContent(modelAction, data){
    switch ( modelAction ){
      case 'user#new':
        prepareNewUserModal(modelAction);
        break;
      case 'user#error':
        prepareErrorModal(modelAction, data);
        break;
    }
  }

  function prepareErrorModal(modelAction, data){
    console.log('passing data through');
    console.log(data);
    $title.html('We\'re missing some info!');
    // $body.html( _views[modelAction] );
    $footer.html('');

    // currently no custom options!
    $modal.modal(_options);
    var missingFields = getEmptyFields(data);
    showUserErrors(missingFields);
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
      var missingFields = getEmptyFields( e.target );
      if ( _.isEmpty( missingFields ) ){
        allowSubmit(e);        
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
        'user[email]': 'email',
        'public_figure[display_name]': 'display name',
        'public_figure[facebook_id]': 'Facebook username', 
        'public_figure[twitter_handle]': 'Twitter handle', 
        'public_figure[twitter_search_terms]': 'Twitter search terms', 
        'public_figure[instagram_id]': 'Instagram username', 
        'public_figure[instagram_search_tags]': 'Instagram search terms'
      },
      missingFields = _.map(missingFields, function(f){
        return fieldToEng[f];
      }),
      errors = missingFields.length > 2 ? 'some inputs' : missingFields.join(' and ');

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

  function getEmptyFields(form){
    var fields = $( form ).serializeArray(),
      invalids = [];
    // 0 => utf code, 1 => name, 2 => email
    // slightly smarter email validation
    _.forEach(fields, function(field){
      if ( field.value === '' ){
        invalids.push(field.name);
      }
    });
    return invalids;
  };
}