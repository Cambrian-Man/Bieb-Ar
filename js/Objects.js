(function() {
  var Ar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Ar = window.Ar != null ? window.Ar : window.Ar = {};

  Ar.FireballSpawner = (function() {
    function FireballSpawner(x, y, direction, timer, offset, group) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.timer = timer;
      this.offset = offset;
      this.group = group;
      this.fireball = new Ar.Fireball(new Phaser.Point(this.x + 16, this.y - 16));
      this.group.add(this.fireball);
    }

    FireballSpawner.prototype.start = function() {
      this.startTime = Date.now() - this.offset;
      return this.fireball.spawn();
    };

    FireballSpawner.prototype.update = function() {
      if ((Date.now() - this.startTime) > this.timer) {
        this.startTime = Date.now();
        return this.fireball.spawn();
      }
    };

    return FireballSpawner;

  })();

  Ar.Fireball = (function(_super) {
    __extends(Fireball, _super);

    function Fireball(start) {
      this.start = start;
      Fireball.__super__.constructor.call(this, Ar.Game, this.start.x, this.start.y, 'fireball', 0);
      this.body.allowGravity = false;
      this.visible = false;
      this.alive = false;
    }

    Fireball.prototype.spawn = function() {
      this.reset(this.start.x, this.start.y);
      return this.body.velocity.y = -150;
    };

    return Fireball;

  })(Phaser.Sprite);

  Ar.Squid = (function(_super) {
    __extends(Squid, _super);

    function Squid(x, y) {
      Squid.__super__.constructor.call(this, Ar.Game, x, y + 32, 'squid');
      this.anchor.x = 0.5;
      this.direction = 1;
      this.body.width = 36;
    }

    Squid.prototype.preUpdate = function() {
      if (this.body.touching.right) {
        this.direction = -1;
      } else if (this.body.touching.left) {
        this.direction = 1;
      }
      this.body.velocity.x = 40 * this.direction;
      this.scale.x = this.direction;
      return Squid.__super__.preUpdate.call(this);
    };

    return Squid;

  })(Phaser.Sprite);

  Ar.Exit = (function(_super) {
    __extends(Exit, _super);

    function Exit(x, y, width, height, target) {
      this.target = target;
      Exit.__super__.constructor.call(this, Ar.Game, x, y, new Phaser.BitmapData(Ar.Game, width, height));
      this.body.allowGravity = false;
    }

    return Exit;

  })(Phaser.Sprite);

  Ar.TextManager = (function() {
    function TextManager() {}

    return TextManager;

  })();

  Ar.Text = (function(_super) {
    __extends(Text, _super);

    function Text(player) {
      this.player = player;
      Text.__super__.constructor.call(this, Ar.Game, 0, 0, 'text', 'text_0');
      this.body = null;
      this.fixedToCamera = true;
      this.visible = false;
      this.cameraOffset.setTo(64, 150);
    }

    Text.prototype.preUpdate = function() {
      var running;
      Text.__super__.preUpdate.call(this);
      if (this.player.cheat != null) {
        this.visible = true;
        switch (this.player.cheat.name) {
          case 'Super Jump':
            this.frameName = 'text_0';
            break;
          case 'Super Speed':
            this.frameName = 'text_1';
            break;
          case 'Invincibility':
            this.frameName = 'text_2';
        }
        running = Date.now() - this.player.cheatStart;
        if (running > 3000) {
          return this.visible = (Math.floor(running / 100) % 2) === 0;
        }
      } else {
        return this.visible = false;
      }
    };

    return Text;

  })(Phaser.Sprite);

}).call(this);

/*
//@ sourceMappingURL=Objects.js.map
*/