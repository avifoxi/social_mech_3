$(document).ready(function(){
  var $grid = $('.masonryGrid');
  $grid.masonry({
    isAnimated: true,
    itemSelector: '.masonryThumb'
  });
  $(window).resize(function(){
    $grid.masonry();
  });

  // temporarily global for easy debugging
  var SQM = new SocialQueryMech(PATHS);
  window.SQM = SQM;
  SQM.init();
});


// PATHS constant, object, instantiated in views/public_figures/show.html.erb
function SocialQueryMech(PATHS){
  this.PATHS = PATHS;
  this.publicFigure = {};
}

SocialQueryMech.prototype = {
  init: function(){
    $.getJSON(this.PATHS.publicFigure, function(res){
      this.publicFigure = res;
      this.checkWhenLastQueried();
    }.bind(this));
  },
  checkWhenLastQueried: function(){
    var lastQuery = new Date(this.publicFigure.updated_at),
      now = new Date(),
      msMinute = 60*1000,
      diff;

    diff = Math.floor( (now - lastQuery)  / msMinute );

    if ( diff >= 10 ){
      this.updateFeed(lastQuery);
    }
  },
  updateFeed: function(lastQuery){
    var url =  this.PATHS.publicFigure,
      callback = this.prependThumbnails,
      data = {
        public_figure: {
          updated_at: JSON.stringify(lastQuery)
        } 
      };
    
    $.ajax({
      type: "PUT",
      url: url,
      data: data,
      dataType: 'json',
      success: function(thumbs) {
        callback(thumbs);
      }
    });
  },
  prependThumbnails: function(thumbs){
    console.log('got da thumbs');
    console.log(thumbs);
  }
}