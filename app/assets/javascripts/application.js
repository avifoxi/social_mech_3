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


// expose the single global var, Parent Component.
// the mixed blessings of the asset pipeline...
window.PreviewPageMaster = require('./public_figures_preview_page_app/previewPageMaster.js');



// NEW FEATURES EXPOSE GLOBALLY, THEN INTEGRATE TO MASTER UPON ACHIEVING FUNCTIONALITY

// window.Dis = require('./public_figures/previewDispatcher.js');