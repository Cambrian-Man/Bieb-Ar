Ar = window.Ar ?= {}

class Ar.FireballSpawner
  constructor: (@x, @y, @direction, @timer, @offset, @group) ->
    @fireball = new Ar.Fireball(new Phaser.Point(@x + 16, @y - 16))
    @group.add @fireball

  start: ->
    @startTime = Date.now() - @offset
    @fireball.spawn()

  update: ->
    if (Date.now() - @startTime) > @timer
      @startTime = Date.now()
      @fireball.spawn()
  
class Ar.Fireball extends Phaser.Sprite
  constructor: (@start) ->
    super(Ar.Game, @start.x, @start.y, 'fireball', 0)

    @body.allowGravity = false
    @visible = false
    @alive = false

  spawn: ->
    @reset @start.x, @start.y
    @body.velocity.y = -150

class Ar.Squid extends Phaser.Sprite
  constructor: (x, y) ->
    super(Ar.Game, x, y, 'squid')

class Ar.Exit extends Phaser.Sprite
  constructor: (x, y, width, height, @target) ->
    super(Ar.Game, x, y, new Phaser.BitmapData(Ar.Game, width, height))
    @body.allowGravity = false