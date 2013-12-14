Ar = window.Ar ?= {}

class Ar.Player extends Phaser.Sprite
  constructor: (game, x, y) ->
    super(game, x, y, 'player')

    @enteringCheat = false
    @cheatKey = ''
    @cheatCode = []
    @cheatStart = -1
    @cheatDuration = 3000

    @anchor.setTo 0.5, 0

    @runSpeed = 80
    @jumpSpeed = -275

    @body.width = 24
    @body.height = 58
    @body.offset.y = 6

    @inputEnabled = true

    @keys = Ar.Game.input.keyboard.createCursorKeys()

  preUpdate: ->
    if @keys.right.isDown
      @body.velocity.x = @runSpeed
      @scale.x = 1
    else if @keys.left.isDown
      @body.velocity.x = -@runSpeed
      @scale.x = -1
    else
      @body.velocity.x = 0

    if Ar.Game.input.keyboard.justPressed 88, 250 and @body.touching.down
      @body.velocity.y = @jumpSpeed

    if not @cheat?
      @enteringCheat = Ar.Game.input.keyboard.isDown 67

      if @enteringCheat
        @enterCheat()
      else
        @cheatCode = []
    else
      if Date.now() - @cheatStart > @cheatDuration
        @cheat.exit.call @

    super()

  enterCheat: ->
    if @keys.up.justPressed 100
      @cheatKey = 'up'
    else if @keys.down.justPressed 100
      @cheatKey = 'down'
    else if @keys.right.justPressed 100
      @cheatKey = 'right'
    else if @keys.left.justPressed 100
      @cheatKey = 'left'

    if @cheatKey is 'up' and @keys.up.justReleased 100
      @cheatCode.push @cheatKey
      @cheatKey = ''
    else if @cheatKey is 'down' and @keys.down.justReleased 100
      @cheatCode.push @cheatKey
      @cheatKey = ''
    else if @cheatKey is 'right' and @keys.right.justReleased 100
      @cheatCode.push @cheatKey
      @cheatKey = ''
    else if @cheatKey is 'left' and @keys.left.justReleased 100
      @cheatCode.push @cheatKey
      @cheatKey = ''

    if @cheatCode.length is 4
      cheatString = @cheatCode.join('')

      if cheatString is 'upupupup'
        @cheat = @cheats['superJump']
      else if cheatString is 'leftrightleftright' or cheatString is 'rightleftrightleft'
        @cheat = @cheats['superSpeed']

      if @cheat?
        @cheat.enter.call @
        @cheatStart = Date.now()

      @cheatCode = []

  cheats:
    superJump:
      name: 'superJump'
      enter: ->
        @jumpSpeed = -500

      exit: ->
        @jumpSpeed = -275
        @cheat = null

    superSpeed:
      name: 'superSpeed'
      enter: ->
        @runSpeed = 200

      exit: ->
        @runSpeed = 80
        @cheat = null