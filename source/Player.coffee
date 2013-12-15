Ar = window.Ar ?= {}

class Ar.Player extends Phaser.Sprite
  constructor: (game, x, y) ->
    super(game, x, y, 'player')

    @enteringCheat = false
    @cheatKey = ''
    @cheatCode = null
    @cheatStart = -1
    @cheatDuration = 4000

    @runSpeed = 80
    @jumpSpeed = -275

    @outOfBoundsKill = true
    @worldThreshold = 100

    @invincible = false

    @events.onKilled.add ->
      @respawn()
    , @

    @anchor.setTo 0.5, 0.5
    @body.width = 24
    @body.height = 58
    @body.offset.y = 6

    @inputEnabled = true

    @keys = Ar.Game.input.keyboard.createCursorKeys()

    @start = new Phaser.Point()

    @animations.add 'stand', ['player_0']
    @animations.add 'walk', ['player_0', 'player_1', 'player_2', 'player_3'], 6, true
    @animations.add 'jump', ['player_4']

  preUpdate: ->
    if @keys.right.isDown
      @body.velocity.x = @runSpeed
      @scale.x = 1
      @play 'walk'
    else if @keys.left.isDown
      @body.velocity.x = -@runSpeed
      @scale.x = -1
      @play 'walk'
    else
      @body.velocity.x = 0
      @play 'stand'

    if not @body.touching.down
      @play 'jump'

    if Ar.Game.input.keyboard.justPressed 88, 250 and @body.touching.down
      @body.velocity.y = @jumpSpeed

    if not @cheat?
      @enteringCheat = Ar.Game.input.keyboard.isDown 67

      if @enteringCheat
        @enterCheat()
      else
        @cheatCode = null
    else
      if Date.now() - @cheatStart > @cheatDuration
        @cheat.exit.call @

    super()

  setStart: (x, y, facing) ->
    @start.setTo x, y + @body.halfHeight
    @startFacing = facing

  enterCheat: ->
    if @keys.up.justPressed 250
      @cheatKey = 'up'
    else if @keys.down.justPressed 250
      @cheatKey = 'down'
    else if @keys.right.justPressed 250
      @cheatKey = 'right'
    else if @keys.left.justPressed 250
      @cheatKey = 'left'

    if @cheatKey is 'up' and @keys.up.justReleased 100
      @cheatCode ?= []
      @cheatCode.push @cheatKey
      @cheatKey = ''
    else if @cheatKey is 'down' and @keys.down.justReleased 100
      @cheatCode ?= []
      @cheatCode.push @cheatKey
      @cheatKey = ''
    else if @cheatKey is 'right' and @keys.right.justReleased 100
      @cheatCode ?= []
      @cheatCode.push @cheatKey
      @cheatKey = ''
    else if @cheatKey is 'left' and @keys.left.justReleased 100
      @cheatCode ?= []
      @cheatCode.push @cheatKey
      @cheatKey = ''

    if @cheatCode?.length is 4
      cheatString = @cheatCode.join('')

      if cheatString is 'upupupup'
        @cheat = @cheats['superJump']
      else if cheatString is 'leftleftleftleft' or cheatString is 'rightrightrightright'
        @cheat = @cheats['superSpeed']
      else if cheatString is 'uprightdownleft' or cheatString is 'upleftdownright'
        @cheat = @cheats['invinciblity']

      if @cheat?
        @cheat.enter.call @
        @cheatStart = Date.now()
        @cheatCode = null
    else if @cheatCode?.length > 4
      @cheatCode.shift()
      console.log @cheatCode

  cheats:
    superJump:
      name: 'Super Jump'
      enter: ->
        @jumpSpeed = -500

      exit: ->
        @jumpSpeed = -275
        @cheat = null

    superSpeed:
      name: 'Super Speed'
      enter: ->
        @runSpeed = 200

      exit: ->
        @runSpeed = 80
        @cheat = null

    invinciblity:
      name: 'Invincibility'
      enter: ->
        @invincible = true

      exit: ->
        @invincible = false
        @cheat = null

  respawn: ->
    if @startFacing is 'right'
      @scale.x = 1
    else if @startFacing is 'left'
      @scale.x = -1

    @reset @start.x, @start.y