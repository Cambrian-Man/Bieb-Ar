(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.Player = (function(_super) {
    __extends(Player, _super);

    function Player(game, x, y) {
      Player.__super__.constructor.call(this, game, x, y, 'player');
      this.enteringCheat = false;
      this.cheatKey = '';
      this.cheatCode = null;
      this.cheatStart = -1;
      this.cheatDuration = 4000;
      this.runSpeed = 80;
      this.jumpSpeed = -275;
      this.outOfBoundsKill = true;
      this.worldThreshold = 100;
      this.invincible = false;
      this.events.onKilled.add(function() {
        Ar.Game.sound.play('death');
        if (Ar.Asshole) {
          return Ar.Game.state.states[Ar.Game.state.current].changeMap('screen1');
        } else {
          return this.respawn();
        }
      }, this);
      this.anchor.setTo(0.5, 0.5);
      this.body.width = 24;
      this.body.height = 58;
      this.body.offset.y = 6;
      this.inputEnabled = true;
      this.keys = Ar.Game.input.keyboard.createCursorKeys();
      this.start = new Phaser.Point();
      this.animations.add('stand', ['player_0']);
      this.animations.add('walk', ['player_0', 'player_1', 'player_2', 'player_3'], 6, true);
      this.animations.add('jump', ['player_4']);
    }

    Player.prototype.preUpdate = function() {
      if (this.keys.right.isDown) {
        this.body.velocity.x = this.runSpeed;
        this.scale.x = 1;
        this.play('walk');
      } else if (this.keys.left.isDown) {
        this.body.velocity.x = -this.runSpeed;
        this.scale.x = -1;
        this.play('walk');
      } else {
        this.body.velocity.x = 0;
        this.play('stand');
      }
      if (!this.body.touching.down) {
        this.play('jump');
      }
      if (Ar.Game.input.keyboard.justPressed(88, 250 && this.body.touching.down)) {
        this.body.velocity.y = this.jumpSpeed;
        Ar.Game.sound.play('jumpgrunt');
      }
      if (this.cheat == null) {
        this.enteringCheat = Ar.Game.input.keyboard.isDown(67);
        if (this.enteringCheat) {
          this.enterCheat();
        } else {
          this.cheatCode = null;
        }
      } else {
        if (Date.now() - this.cheatStart > this.cheatDuration) {
          this.cheat.exit.call(this);
        }
      }
      return Player.__super__.preUpdate.call(this);
    };

    Player.prototype.setStart = function(x, y, facing) {
      this.start.setTo(x, y + this.body.halfHeight);
      return this.startFacing = facing;
    };

    Player.prototype.enterCheat = function() {
      var cheatString, _ref, _ref1;
      if (this.keys.up.justPressed(250)) {
        this.cheatKey = 'up';
      } else if (this.keys.down.justPressed(250)) {
        this.cheatKey = 'down';
      } else if (this.keys.right.justPressed(250)) {
        this.cheatKey = 'right';
      } else if (this.keys.left.justPressed(250)) {
        this.cheatKey = 'left';
      }
      if (this.cheatKey === 'up' && this.keys.up.justReleased(100)) {
        if (this.cheatCode == null) {
          this.cheatCode = [];
        }
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      } else if (this.cheatKey === 'down' && this.keys.down.justReleased(100)) {
        if (this.cheatCode == null) {
          this.cheatCode = [];
        }
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      } else if (this.cheatKey === 'right' && this.keys.right.justReleased(100)) {
        if (this.cheatCode == null) {
          this.cheatCode = [];
        }
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      } else if (this.cheatKey === 'left' && this.keys.left.justReleased(100)) {
        if (this.cheatCode == null) {
          this.cheatCode = [];
        }
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      }
      if (((_ref = this.cheatCode) != null ? _ref.length : void 0) === 4) {
        cheatString = this.cheatCode.join('');
        if (cheatString === 'upupupup') {
          this.cheat = this.cheats['superJump'];
        } else if (cheatString === 'leftleftleftleft' || cheatString === 'rightrightrightright') {
          this.cheat = this.cheats['superSpeed'];
        } else if (cheatString === 'uprightdownleft' || cheatString === 'upleftdownright') {
          this.cheat = this.cheats['invinciblity'];
        }
        if (this.cheat != null) {
          this.cheat.enter.call(this);
          this.cheatStart = Date.now();
          return this.cheatCode = null;
        }
      } else if (((_ref1 = this.cheatCode) != null ? _ref1.length : void 0) > 4) {
        return this.cheatCode.shift();
      }
    };

    Player.prototype.cheats = {
      superJump: {
        name: 'Super Jump',
        enter: function() {
          return this.jumpSpeed = -500;
        },
        exit: function() {
          this.jumpSpeed = -275;
          return this.cheat = null;
        }
      },
      superSpeed: {
        name: 'Super Speed',
        enter: function() {
          return this.runSpeed = 200;
        },
        exit: function() {
          this.runSpeed = 80;
          return this.cheat = null;
        }
      },
      invinciblity: {
        name: 'Invincibility',
        enter: function() {
          return this.invincible = true;
        },
        exit: function() {
          this.invincible = false;
          return this.cheat = null;
        }
      }
    };

    Player.prototype.respawn = function() {
      if (this.startFacing === 'right') {
        this.scale.x = 1;
      } else if (this.startFacing === 'left') {
        this.scale.x = -1;
      }
      return this.reset(this.start.x, this.start.y);
    };

    return Player;

  })(Phaser.Sprite);

}).call(this);

/*
//@ sourceMappingURL=Player.js.map
*/