(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.TitleState = (function(_super) {
    __extends(TitleState, _super);

    function TitleState() {}

    TitleState.prototype.create = function() {
      this.backdrop = this.add.tileSprite(0, 0, 400, 300, 'backdrop');
      return this.add.sprite(0, 0, 'title');
    };

    TitleState.prototype.render = function() {
      this.backdrop.tilePosition.x += -0.2;
      return TitleState.__super__.render.call(this);
    };

    TitleState.prototype.preload = function() {
      Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
      Ar.Game.stage.scale.scaleFactor.setTo(1.5, 1.5);
      Ar.Game.stage.scale.maxWidth = 600;
      Ar.Game.stage.scale.maxHeight = 450;
      Ar.Game.stage.scale.setSize();
      Ar.Game.stage.scale.refresh();
      Ar.Game.load.audio('jumpgrunt', 'assets/sound/jumpgrunt.mp3');
      Ar.Game.load.audio('death', 'assets/sound/death.mp3');
      Ar.Game.load.image('backdrop', 'assets/graphics/backdrop.png');
      Ar.Game.load.image('title', 'assets/graphics/title.png');
      Ar.Game.load.image('end', 'assets/graphics/end.png');
      Ar.Game.load.image('border', 'assets/graphics/border.png');
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

    TitleState.prototype.update = function() {
      if (Ar.Game.input.keyboard.justReleased(88)) {
        Ar.Asshole = false;
        return Ar.Game.state.start('play', true, false);
      } else if (Ar.Game.input.keyboard.justReleased(67)) {
        Ar.Asshole = true;
        return Ar.Game.state.start('play', true, false);
      }
    };

    return TitleState;

  })(Phaser.State);

  Ar.EndState = (function(_super) {
    __extends(EndState, _super);

    function EndState() {}

    EndState.prototype.create = function() {
      var title;
      Ar.Game.camera.follow(null);
      Ar.Game.camera.x = 0;
      Ar.Game.camera.y = 0;
      Ar.Game.physics.gravity.y = 0;
      title = this.add.sprite(0, 0, 'end');
      return title.body = null;
    };

    EndState.prototype.update = function() {
      if (Ar.Game.input.keyboard.justReleased(67, 100)) {
        return Ar.Game.state.start('default');
      }
    };

    return EndState;

  })(Phaser.State);

}).call(this);

/*
//@ sourceMappingURL=StartEnd.js.map
*/