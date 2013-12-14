(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.Player = (function(_super) {
    __extends(Player, _super);

    function Player(game, x, y) {
      Player.__super__.constructor.call(this, game, x, y, 'player');
    }

    return Player;

  })(Phaser.Sprite);

}).call(this);

/*
//@ sourceMappingURL=Player.js.map
*/