//= require "../bower_components/modernizr/modernizr.js"
//= require "../bower_components/jquery/dist/jquery.min.js"
//= require "../bower_components/jquery.transit/jquery.transit.js"

// -------------------------------------------------
//
// Home
// 
// -------------------------------------------------

(function() {

  "use strict";

  var Piece = function() {

    var self = this;

    self.init();

  };

  Piece.prototype = {

    // -------------------------------------------------
    //
    // Initial scene setup
    // 
    // -------------------------------------------------

    init: function() {

      var self = this;

      console.log('hello world');

    }

  };

  new Piece();

})();