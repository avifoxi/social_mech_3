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


// POLLING_PATHS constant, object, instantiated in views/public_figures/show.html.erb
function SocialQueryMech(PATHS){
  this.PATHS = PATHS;
  this.publicFigure = {};
}

SocialQueryMech.prototype = {
  init: function(){
    $.get(this.PATHS.publicFigure, function(res){
      this.publicFigure = res;
      this.checkWhenLastQueried();
    }.bind(this));
  },
  checkWhenLastQueried: function(){
    
  }
}