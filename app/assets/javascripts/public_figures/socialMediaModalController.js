function SocialMediaModalCtrl(context){
	var _modalContents = {
			title: undefined,
			content: undefined,
			footer: undefined
		},
		_options = {},
    _renderedHtml = '',
	  _modalTemplate = _.template( $.trim( $('#modal-template').text() ) ),
	  $mountNode = undefined,
	  $modal = undefined;


	// anticipating multiple contexts for modal usage
	switch (context){
		case 'preview':
			preparePreviewModal();
			break;
	}


 	this.show = function(){
 		$modal.modal();
 	};


  function preparePreviewModal(){
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    // set template contents for this context
  	_modalContents.title = 'Like what you see?';
  	_modalContents.content = $('#user-form').html();
  	_modalContents.footer = 'important footer blah blah';

    // set options for modal reactivity in this context
    _options;
  	_renderedHtml = _modalTemplate(_modalContents);
  	$mountNode = $('.masonryGrid');
  	$mountNode.append(_renderedHtml);
  	$modal = $('.modal');
    $thankYou = $('#thankYouForSub').html();
    $modalBody = $('.modal-body');

    $('.modal input[type="submit"]').click(function(e){
      e.preventDefault();
      console.log('i beeen clicked');
      $('#newUserForm').hide(200);
      $modalBody.append($thankYou).fadeIn(300);
      setTimeout(function(){
        $modal.modal('hide');
      }, 1500); 
    });
  };

  function render(){

  }

}