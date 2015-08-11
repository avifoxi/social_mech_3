$(document).ready(function(){
  // var $grid = $('.masonryGrid');
 

  // temporarily global for easy debugging
  var SQM = new SocialQueryMech(PATHS);
  window.SQM = SQM;
  SQM.init();
});


// PATHS constant, object, instantiated in views/public_figures/show.html.erb
function SocialQueryMech(PATHS){
  this.PATHS = PATHS;
  this.publicFigure = {};
  this.templates = {
    insta: null,
    tweet: null
  };
  this.$grid = undefined;
}

SocialQueryMech.prototype = {
  init: function(){    
    $.getJSON(this.PATHS.templates, function(res){
      this.prepareTemplates(res);
      this.getPublicFigure();
    }.bind(this));
  },
  getPublicFigure: function(){
    $.getJSON(this.PATHS.publicFigure, function(res){
      this.publicFigure = res;
      this.appendThumbnails();
    }.bind(this));
  },
  configureGrid: function($thumbs){
    this.$grid = $('.masonryGrid');
    var $g = this.$grid;
    $g.append($thumbs);
    $g.masonry({
      isAnimated: true,
      itemSelector: '.masonryThumb'
    });
    $(window).resize(function(){
      $g.masonry();
    });
    this.checkWhenLastQueried();
  },
  checkWhenLastQueried: function(){
    var lastQuery = new Date(this.publicFigure.updated_at),
      now = new Date(),
      msMinute = 60*1000,
      diff;

    diff = Math.floor( (now - lastQuery)  / msMinute );

    if ( diff >= 10 ){
      console.log('longer than 10')
      this.updateFeed(lastQuery);
    }
  },
  updateFeed: function(lastQuery){
    var url =  this.PATHS.publicFigure,
      callback = this.determineDomUpdates,
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
      success: function(updatedPublicFigure) {
        callback(updatedPublicFigure);
      }
    });
  },
  prepareTemplates: function(jsonOfHtml){
    // set lodash to work w mustach brackets
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    
    _.forIn(jsonOfHtml, function(html, key) {
      this.templates[key] = _.template(html);
    }.bind(this));
  },
  getHtmlFromTemps: function(subset){
    var tweets, 
      instas,
      renderedStrings = [];

    if ( subset ){
      tweets = subset.tweets;
      instas = subset.instas;
    } else {
      tweets = this.publicFigure.most_recent_tweets;
      instas = this.publicFigure.most_recent_instagrams;
    }
    _.forEach(tweets, function(t){
      renderedStrings.push(this.templates.tweet(t));
    }.bind(this));
    _.forEach(instas, function(i){
      renderedStrings.push(this.templates.insta(i));
    }.bind(this));
    return renderedStrings;
  },
  appendThumbnails: function(){
    var preppedThumbs = this.getHtmlFromTemps(),
      $thumbs = [];

    _.map(preppedThumbs, function(thumb){
      $thumbs.push($.trim(thumb))
    });

    if ( !this.$grid ){
      this.configureGrid($thumbs);
    } else {
      this.$grid.append($thumbs).masonry( 'appended', $thumbs );
    } 
  },
  determineDomUpdates: function(updatedPublicFigure){
    console.log(updatedPublicFigure);

  },
  prependThumbnails: function(thumbs){
    console.log('got da thumbs');
    console.log(thumbs);
  }
}