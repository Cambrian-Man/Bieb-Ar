(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.PlayState = (function(_super) {
    __extends(PlayState, _super);

    function PlayState() {}

    PlayState.prototype.create = function() {
      var object, spawner, _i, _len, _ref, _results;
      this.backdrop = this.add.tileSprite(0, 0, 400, 300, 'backdrop');
      this.backdrop.body.allowGravity = false;
      this.backdrop.fixedToCamera = true;
      this.loadMap('tiles', 'screen2');
      Ar.Game.physics.gravity = new Phaser.Point(0, 10);
      this.player = new Ar.Player(Ar.Game, 128, 128);
      this.add.existing(this.player);
      this.camera.follow(this.player);
      this.fireballs = this.add.group();
      this.fireballSpawners = [];
      _ref = this.data.data.layers[2].objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        switch (object.name) {
          case 'start':
            this.player.start.setTo(object.x, object.y + 6);
            _results.push(this.player.respawn());
            break;
          case 'fireball':
            spawner = new Ar.FireballSpawner(object.x, object.y, object.type, Number(object.properties.timer), Number(object.properties.offset), this.fireballs);
            this.fireballSpawners.push(spawner);
            _results.push(spawner.start());
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    PlayState.prototype.render = function() {
      this.backdrop.tilePosition.x = -(this.camera.x / 3);
      return PlayState.__super__.render.call(this);
    };

    PlayState.prototype.preload = function() {
      Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      Ar.Game.stage.scale.scaleFactor.setTo(2, 2);
      Ar.Game.stage.scale.maxWidth = 800;
      Ar.Game.stage.scale.maxHeight = 600;
      Ar.Game.stage.scale.setSize();
      Ar.Game.stage.scale.refresh();
      Ar.Game.load.atlasXML('player', 'assets/graphics/player.png', 'assets/graphics/player.xml');
      Ar.Game.load.image('fireball', 'assets/graphics/fireball.png');
      Ar.Game.load.image('backdrop', 'assets/graphics/backdrop.png');
      Ar.Game.load.tileset('tiles', 'assets/graphics/tiles.png', 48, 48);
      Ar.Game.load.tilemap('screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON);
      return Ar.Game.load.tilemap('screen2', 'assets/levels/screen2.json', null, Phaser.Tilemap.TILED_JSON);
    };

    PlayState.prototype.loadMap = function(tiles, map) {
      this.map = this.add.tilemap(map);
      this.tileset = this.add.tileset(tiles);
      this.tileset.setCollisionRange(1, 2, true, true, true, true);
      this.tileset.setCollision(10, true, true, true, true);
      this.tileset.setCollision(12, true, true, true, true);
      this.tileset.setCollision(20, true, true, true, true);
      this.background = this.add.tilemapLayer(0, 0, 400, 300, this.tileset, this.map, 0);
      this.walls = this.add.tilemapLayer(0, 0, 400, 300, this.tileset, this.map, 1);
      this.walls.resizeWorld();
      return this.data = Ar.Game.cache.getTilemapData(map);
    };

    PlayState.prototype.update = function() {
      var spawner, _i, _len, _ref;
      _ref = this.fireballSpawners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        spawner = _ref[_i];
        spawner.update();
      }
      Ar.Game.physics.collide(this.player, this.walls);
      Ar.Game.physics.collide(this.player);
      Ar.Game.physics.collide(this.player, this.fireballs, function(player) {
        player.respawn();
        return false;
      }, null, this);
      return Ar.Game.physics.collide(this.fireballs, this.walls, function(fireball) {
        return fireball.kill();
      }, null, this);
    };

    return PlayState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=PlayState.js.map
*/