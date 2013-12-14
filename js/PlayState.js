(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.PlayState = (function(_super) {
    __extends(PlayState, _super);

    function PlayState() {}

    PlayState.prototype.create = function() {
      this.loadMap('tiles', 'screen1');
      Ar.Game.physics.gravity = new Phaser.Point(0, 10);
      this.player = new Ar.Player(Ar.Game, 128, 128);
      this.add.existing(this.player);
      return this.camera.follow(this.player);
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
      Ar.Game.load.image('player', 'assets/graphics/player.png');
      Ar.Game.load.tileset('tiles', 'assets/graphics/tiles.png', 48, 48);
      return Ar.Game.load.tilemap('screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON);
    };

    PlayState.prototype.loadMap = function(tiles, map) {
      this.map = this.add.tilemap(map);
      this.tileset = this.add.tileset(tiles);
      this.tileset.setCollisionRange(1, 2, true, true, true, true);
      this.tileset.setCollision(12, true, true, true, true);
      this.background = this.add.tilemapLayer(0, 0, 400, 300, this.tileset, this.map, 0);
      this.walls = this.add.tilemapLayer(0, 0, 400, 300, this.tileset, this.map, 1);
      return this.walls.resizeWorld();
    };

    PlayState.prototype.update = function() {
      return Ar.Game.physics.collide(this.player, this.walls);
    };

    return PlayState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=PlayState.js.map
*/