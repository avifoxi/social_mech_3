// This object is instantiated in public_figures/show.html in a script tag, to coerce loading if rails does not reload full page
// PATHS constant, object, instantiated in views/public_figures/show.html.erb

'use strict';

function SocialMediaThumbnailController(MASTER){
  this.PATHS = MASTER.getPATHS();
  this.context = MASTER.getCONTEXT();
  this.publicFigure = {};
  this.templates = {
    insta: undefined,
    tweet: undefined
  };
  this.$grid = undefined;
}

SocialMediaThumbnailController.prototype = {
  show: function(){
    if ( this.$grid ){
      this.$grid.show().fadeIn(200);
    }
  },
  hide: function(){
    this.$grid.hide().fadeOut(200);
  },
  init: function(){    
    $.getJSON(this.PATHS.templates, function(res){
      this.prepareTemplates(res);
      if (this.context !== 'preview'){
        this.getPublicFigure();
      }
    }.bind(this));
  },
  setPublicFigure: function(previewFigure){
    if (this.context === 'preview'){
      this.publicFigure = previewFigure;
      this.appendThumbnails();
    }
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
    $g.imagesLoaded(function(){
      $g.masonry({
        isAnimated: true,
        itemSelector: '.masonryThumb'
      });
    })
    $(window).resize(function(){
      $g.masonry();
    });
    if ( this.context !== 'preview'){
      this.checkWhenLastQueried();
    }
  },
  clearGrid: function(){
    if ( this.$grid ) {
      this.$grid.masonry( 'remove', $('.masonryThumb') );
      // this.$grid.html('').masonry();
    }
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
      success: function(newMedia) {
        callback(newMedia);
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
      this.clearGrid();
      this.$grid.imagesLoaded(function(){
        this.$grid.append( $thumbs )
          .masonry('appended', $('.masonryThumb'));
        this.$grid.masonry(); // need multiple calls to masonry layout... not interested in debugging this currently though i suspect its a glitch with the library, and not my useage
      }.bind(this));
    } 
  },
  determineDomUpdates: function(newMedia){
    var count = _.flatten(_.values(newMedia)).length,
      htmlStrings = [];
    if ( count > 0 ) {
      htmlStrings = this.getHtmlFromTemps(newMedia);
      this.prependThumbnails(htmlStrings);
    };

  },
  prependThumbnails: function(thumbs){
    var $thumbs = [];
    _.map(preppedThumbs, function(thumb){
      $thumbs.push($.trim(thumb))
    });
    this.$grid.prepend($thumbs)
      .masonry('prepended', $thumbs);
  }
}

module.exports = SocialMediaThumbnailController;