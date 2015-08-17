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
 		// $modal.modal(_options);
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
   
    $thankYou = _views['thanks-for-submission'];
    // currently no custom options!
    $modal.modal(_options);

    $('.modal input[type="submit"]').click(function(e){
      e.preventDefault();
      $('#solicit').animate({
        height: "toggle"
      }, 500);
      $body.append($thankYou).fadeIn(300);
      setTimeout(function(){
        $modal.modal('hide');
        MASTER.resume();
      }, 1500); 
    });
  };

}