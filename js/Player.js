(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.Player = (function(_super) {
    __extends(Player, _super);

    function Player(game, x, y) {
      Player.__super__.constructor.call(this, game, x, y, 'player');
      this.anchor.setTo(0.5, 0);
      this.runSpeed = 80;
      this.jumpSpeed = -200;
      this.keys = Ar.Game.input.keyboard.createCursorKeys();
      this.inputEnabled = true;
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
      if (Ar.Game.input.keyboard.justPressed(88, 100 && this.body.touching.down)) {
        this.body.velocity.y = this.jumpSpeed;
      }
      return Player.__super__.preUpdate.call(this);
    };

    return Player;

  })(Phaser.Sprite);

}).call(this);

/*
//@ sourceMappingURL=Player.js.map
*/