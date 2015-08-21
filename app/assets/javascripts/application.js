// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require lodash
//= require masonry/jquery.masonry
//= require imagesloaded
//= require moment
//= require turbolinks
//= require_tree .
//= ./public_figures require_tree 

var PreviewPageMaster = require('./public_figures/previewPageMaster.js');

$(document).ready(function() {
  window.PreviewPageMaster = PreviewPageMaster;
});