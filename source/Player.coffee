Ar = window.Ar ?= {}

class Ar.Player extends Phaser.Sprite
  constructor: (game, x, y) ->
    super(game, x, y, 'player')

    @anchor.setTo 0.5, 0

    @runSpeed = 80
    @jumpSpeed = -200

    @keys = Ar.Game.input.keyboard.createCursorKeys()
    @inputEnabled = true

  preUpdate: ->
    if @keys.right.isDown
      @body.velocity.x = @runSpeed
      @scale.x = 1
    else if @keys.left.isDown
      @body.velocity.x = -@runSpeed
      @scale.x = -1
    else
      @body.velocity.x = 0

    if Ar.Game.input.keyboard.justPressed 88, 100 and @body.touching.down
      @body.velocity.y = @jumpSpeed

    super()