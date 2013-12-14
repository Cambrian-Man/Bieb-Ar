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
      this.cheatCode = [];
      this.cheatStart = -1;
      this.cheatDuration = 3000;
      this.anchor.setTo(0.5, 0);
      this.runSpeed = 80;
      this.jumpSpeed = -275;
      this.body.width = 24;
      this.body.height = 58;
      this.body.offset.y = 6;
      this.inputEnabled = true;
      this.keys = Ar.Game.input.keyboard.createCursorKeys();
    }

    Player.prototype.preUpdate = function() {
      if (this.keys.right.isDown) {
        this.body.velocity.x = this.runSpeed;
        this.scale.x = 1;
      } else if (this.keys.left.isDown) {
        this.body.velocity.x = -this.runSpeed;
        this.scale.x = -1;
      } else {
        this.body.velocity.x = 0;
      }
      if (Ar.Game.input.keyboard.justPressed(88, 250 && this.body.touching.down)) {
        this.body.velocity.y = this.jumpSpeed;
      }
      if (this.cheat == null) {
        this.enteringCheat = Ar.Game.input.keyboard.isDown(67);
        if (this.enteringCheat) {
          this.enterCheat();
        } else {
          this.cheatCode = [];
        }
      } else {
        if (Date.now() - this.cheatStart > this.cheatDuration) {
          this.cheat.exit.call(this);
        }
      }
      return Player.__super__.preUpdate.call(this);
    };

    Player.prototype.enterCheat = function() {
      var cheatString;
      if (this.keys.up.justPressed(100)) {
        this.cheatKey = 'up';
      } else if (this.keys.down.justPressed(100)) {
        this.cheatKey = 'down';
      } else if (this.keys.right.justPressed(100)) {
        this.cheatKey = 'right';
      } else if (this.keys.left.justPressed(100)) {
        this.cheatKey = 'left';
      }
      if (this.cheatKey === 'up' && this.keys.up.justReleased(100)) {
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      } else if (this.cheatKey === 'down' && this.keys.down.justReleased(100)) {
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      } else if (this.cheatKey === 'right' && this.keys.right.justReleased(100)) {
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      } else if (this.cheatKey === 'left' && this.keys.left.justReleased(100)) {
        this.cheatCode.push(this.cheatKey);
        this.cheatKey = '';
      }
      if (this.cheatCode.length === 4) {
        cheatString = this.cheatCode.join('');
        if (cheatString === 'upupupup') {
          this.cheat = this.cheats['superJump'];
        } else if (cheatString === 'leftrightleftright' || cheatString === 'rightleftrightleft') {
          this.cheat = this.cheats['superSpeed'];
        }
        if (this.cheat != null) {
          this.cheat.enter.call(this);
          this.cheatStart = Date.now();
        }
        return this.cheatCode = [];
      }
    };

    Player.prototype.cheats = {
      superJump: {
        name: 'superJump',
        enter: function() {
          return this.jumpSpeed = -500;
        },
        exit: function() {
          this.jumpSpeed = -275;
          return this.cheat = null;
        }
      },
      superSpeed: {
        name: 'superSpeed',
        enter: function() {
          return this.runSpeed = 200;
        },
        exit: function() {
          this.runSpeed = 80;
          return this.cheat = null;
        }
      }
    };

    return Player;

  })(Phaser.Sprite);

}).call(this);

/*
//@ sourceMappingURL=Player.js.map
*/