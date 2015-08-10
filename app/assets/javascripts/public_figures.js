$(document).ready(function(){
  var $grid = $('.masonryGrid');
  $grid.masonry({
    isAnimated: true,
    itemSelector: '.masonryThumb'
  });
  $(window).resize(function(){
    $grid.masonry();
  });
});



// $(document).ready(function(){

//   var topSegments = $('.thumbTop');
//   var bottomSegments = $('.thumbnail .caption');

//   var batches = [topSegments, bottomSegments];

//   batchNormalizeHeights(batches);

//   $( window ).resize(function() {
//     batchNormalizeHeights(batches);
//   });
// });

// function maxHeight($collection){
//   var heights = $collection.map(function(i, el){ 
//     return $(el).height()
//   });
//   return _.max(heights);
// }

// function resizeHeightTo($collection, height){
//   $.each($collection, function(i, el){
//     $(el).height(height);
//   })
// }

// function normalizeSegments($collection){
//   var max = maxHeight($collection);
//   resizeHeightTo($collection, max);
// }

// function batchNormalizeHeights($array){
//   _.each($array, function($collection){
//     normalizeSegments($collection);
//   });
// }