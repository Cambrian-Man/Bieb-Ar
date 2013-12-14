(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.PlayState = (function(_super) {
    __extends(PlayState, _super);

    function PlayState() {}

    PlayState.prototype.create = function() {};

    PlayState.prototype.render = function() {};

    PlayState.prototype.preload = function() {};

    return PlayState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=PlayState.js.map
*/