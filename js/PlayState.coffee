(function() {
  var PlayState, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  PlayState = (function(_super) {
    __extends(PlayState, _super);

    function PlayState() {
      _ref = PlayState.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlayState.prototype.create = function() {
      return console.log('Yep.');
    };

    return PlayState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=PlayState.js.map
*/