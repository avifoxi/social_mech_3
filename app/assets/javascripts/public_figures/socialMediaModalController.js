function SocialMediaModalCtrl(MASTER){
	_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
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
	switch ( MASTER.getCONTEXT() ){
		case 'preview':
			preparePreviewModal();
			break;
	}

 	this.show = function(){
 		$modal.modal(_options);
 	};

  function preparePreviewModal(){ 
    // set template contents for this context
  	_modalContents.title = 'Like what you see?';
  	_modalContents.content = $('#user-form').html();
  	_modalContents.footer = '';

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
      $('#pleasedToMeetYa').animate({
        height: "toggle"
      }, 500);
      $modalBody.append($thankYou).fadeIn(300);
      setTimeout(function(){
        $modal.modal('hide');
      }, 1500); 
    });
  };

 //  function render(){

 //  }

}