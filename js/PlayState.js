(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.PlayState = (function(_super) {
    __extends(PlayState, _super);

    function PlayState() {}

    PlayState.prototype.create = function() {
      this.backdrop = this.add.tileSprite(0, 0, 400, 300, 'backdrop');
      this.backdrop.body.allowGravity = false;
      this.backdrop.fixedToCamera = true;
      this.player = new Ar.Player(Ar.Game, 128, 128);
      this.loadMap('tiles', 'screen4');
      Ar.Game.physics.gravity = new Phaser.Point(0, 10);
      this.add.existing(this.player);
      this.camera.follow(this.player);
      this.border = this.add.sprite(0, 0, 'border');
      this.border.body = null;
      this.border.fixedToCamera = true;
      this.text = new Ar.Text(this.player);
      return this.add.existing(this.text);
    };

    PlayState.prototype.render = function() {
      this.backdrop.tilePosition.x = -(this.camera.x / 3);
      return PlayState.__super__.render.call(this);
    };

    PlayState.prototype.preload = function() {
      Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      Ar.Game.stage.scale.scaleFactor.setTo(1.5, 1.5);
      Ar.Game.stage.scale.maxWidth = 600;
      Ar.Game.stage.scale.maxHeight = 450;
      Ar.Game.stage.scale.setSize();
      Ar.Game.stage.scale.refresh();
      Ar.Game.load.image('border', 'assets/graphics/border.png');
      Ar.Game.load.image('backdrop', 'assets/graphics/backdrop.png');
      Ar.Game.load.atlasXML('text', 'assets/graphics/text.png', 'assets/graphics/text.xml');
      Ar.Game.load.atlasXML('player', 'assets/graphics/player.png', 'assets/graphics/player.xml');
      Ar.Game.load.image('fireball', 'assets/graphics/fireball.png');
      Ar.Game.load.image('squid', 'assets/graphics/squid.png');
      Ar.Game.load.tileset('tiles', 'assets/graphics/tiles.png', 48, 48);
      Ar.Game.load.tilemap('screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON);
      Ar.Game.load.tilemap('screen2', 'assets/levels/screen2.json', null, Phaser.Tilemap.TILED_JSON);
      Ar.Game.load.tilemap('screen3', 'assets/levels/screen3.json', null, Phaser.Tilemap.TILED_JSON);
      Ar.Game.load.tilemap('screen4', 'assets/levels/screen4.json', null, Phaser.Tilemap.TILED_JSON);
      return Ar.Game.load.tilemap('screen5', 'assets/levels/screen5.json', null, Phaser.Tilemap.TILED_JSON);
    };

    PlayState.prototype.loadMap = function(tiles, map) {
      var data;
      this.map = this.add.tilemap(map);
      if (this.tileset == null) {
        this.tileset = this.add.tileset(tiles);
        this.tileset.setCollisionRange(1, 2, true, true, true, true);
        this.tileset.setCollision(10, true, true, true, true);
        this.tileset.setCollision(12, true, true, true, true);
        this.tileset.setCollision(20, true, true, true, true);
        this.tileset.setCollisionRange(31, 33, true, true, true, true);
        this.tileset.setCollisionRange(40, 41, true, true, true, true);
      }
      if (this.background == null) {
        this.background = this.add.tilemapLayer(0, 0, 400, 300, this.tileset, this.map, 0);
      } else {
        this.background.updateMapData(this.map, 0);
      }
      if (this.walls == null) {
        this.walls = this.add.tilemapLayer(0, 0, 400, 300, this.tileset, this.map, 1);
      } else {
        this.walls.updateMapData(this.map, 1);
      }
      this.walls.resizeWorld();
      data = Ar.Game.cache.getTilemapData(map);
      this.loadObjects(data);
      if (this.border != null) {
        return this.border.bringToTop();
      }
    };

    PlayState.prototype.loadObjects = function(data) {
      var object, spawner, squid, _i, _len, _ref, _results;
      if (this.fireballs != null) {
        this.fireballs.destroy();
      }
      this.fireballs = this.add.group();
      this.fireballs.exists = false;
      this.fireballSpawners = [];
      if (this.enemies != null) {
        this.enemies.destroy();
      }
      this.enemies = this.add.group();
      this.enemies.exists = false;
      _ref = data.data.layers[2].objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        switch (object.name) {
          case 'start':
            this.player.setStart(object.x, object.y, object.type);
            _results.push(this.player.respawn());
            break;
          case 'fireball':
            this.fireballs.exists = true;
            spawner = new Ar.FireballSpawner(object.x, object.y, object.type, Number(object.properties.timer), Number(object.properties.offset), this.fireballs);
            this.fireballSpawners.push(spawner);
            _results.push(spawner.start());
            break;
          case 'squid':
            this.enemies.exists = true;
            squid = new Ar.Squid(object.x, object.y);
            _results.push(this.enemies.add(squid));
            break;
          case 'exit':
            this.exit = new Ar.Exit(object.x, object.y, object.width, object.height, object.type);
            _results.push(this.add.existing(this.exit));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    PlayState.prototype.changeMap = function(to) {
      return this.loadMap('tiles', to);
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
      Ar.Game.physics.collide(this.enemies, this.walls);
      Ar.Game.physics.overlap(this.player, this.fireballs, function(player) {
        if (!player.invincible) {
          return player.respawn();
        }
      }, null, this);
      Ar.Game.physics.overlap(this.player, this.enemies, function(player) {
        if (!player.invincible) {
          return player.respawn();
        }
      }, null, this);
      Ar.Game.physics.collide(this.fireballs, this.walls, function(fireball) {
        return fireball.kill();
      }, null, this);
      return Ar.Game.physics.overlap(this.player, this.exit, function(player, exit) {
        return this.changeMap(exit.target);
      }, null, this);
    };

    return PlayState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=PlayState.js.map
*/