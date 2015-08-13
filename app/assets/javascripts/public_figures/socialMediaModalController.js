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
  };

  function render(){

  }

}