var SocialMediaResultsPreview = function(previewUrl){
  var $form = $('form');

  $('[data="preview"]').click(function(e){
    e.preventDefault();
    postPreviewGetMedia($form.serialize());
  });
  
  function postPreviewGetMedia(data){
    var callback = handoffToThumbNailController;
    
    $.ajax({
      type: "POST",
      url: previewUrl,
      data: data,
      success: function(res){
        callback(res)
      },
      dataType: 'json'
    });
  };
  function handoffToThumbNailController(json){
    console.log(json)
    window.previewJSON = json;
  };
}