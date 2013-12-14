(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.PlayState = (function(_super) {
    __extends(PlayState, _super);

    function PlayState() {}

    PlayState.prototype.create = function() {
      var player;
      player = new Ar.Player(Ar.Game, 128, 128);
      return this.add.existing(player);
    };

    PlayState.prototype.render = function() {
      return PlayState.__super__.render.call(this);
    };

    PlayState.prototype.preload = function() {
      Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      Ar.Game.stage.scale.scaleFactor.setTo(2, 2);
      Ar.Game.stage.scale.maxWidth = 800;
      Ar.Game.stage.scale.maxHeight = 600;
      Ar.Game.stage.scale.setSize();
      Ar.Game.stage.scale.refresh();
      return Ar.Game.load.image('player', 'assets/gfx/player.png');
    };

    return PlayState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=PlayState.js.map
*/