Ar = window.Ar ?= {}

class Ar.TitleState extends Phaser.State
  constructor: ->

  create: ->
    @backdrop = @add.tileSprite 0, 0, 400, 300, 'backdrop'
    @add.sprite 0, 0, 'title'

  render: ->
    @backdrop.tilePosition.x += -0.2
    super()
  
  preload: ->
    # Set up Stage Settings
    Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL
    Ar.Game.stage.scale.scaleFactor.setTo 1.5, 1.5
    Ar.Game.stage.scale.maxWidth = 600
    Ar.Game.stage.scale.maxHeight = 450
    Ar.Game.stage.scale.setSize()
    Ar.Game.stage.scale.refresh()

    Ar.Game.load.audio 'jumpgrunt', 'assets/sound/jumpgrunt.mp3'
    Ar.Game.load.audio 'death', 'assets/sound/death.mp3'
    Ar.Game.load.audio 'music', 'assets/sound/BiebMarch.mp3'

    Ar.Game.load.image 'backdrop', 'assets/graphics/backdrop.png'
    Ar.Game.load.image 'title', 'assets/graphics/title.png'
    Ar.Game.load.image 'end', 'assets/graphics/end.png'

    Ar.Game.load.image 'border', 'assets/graphics/border.png'

    Ar.Game.load.atlasXML 'text', 'assets/graphics/text.png', 'assets/graphics/text.xml'

    Ar.Game.load.atlasXML 'player', 'assets/graphics/player.png', 'assets/graphics/player.xml'
    Ar.Game.load.image 'fireball', 'assets/graphics/fireball.png'
    Ar.Game.load.image 'squid', 'assets/graphics/squid.png'

    Ar.Game.load.tileset 'tiles', 'assets/graphics/tiles.png', 48, 48
    Ar.Game.load.tilemap 'screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON
    Ar.Game.load.tilemap 'screen2', 'assets/levels/screen2.json', null, Phaser.Tilemap.TILED_JSON
    Ar.Game.load.tilemap 'screen3', 'assets/levels/screen3.json', null, Phaser.Tilemap.TILED_JSON
    Ar.Game.load.tilemap 'screen4', 'assets/levels/screen4.json', null, Phaser.Tilemap.TILED_JSON
    Ar.Game.load.tilemap 'screen5', 'assets/levels/screen5.json', null, Phaser.Tilemap.TILED_JSON

  update: ->
    if Ar.Game.input.keyboard.justReleased 88
      Ar.Asshole = false
      Ar.Game.state.start 'play', true, false
    else if Ar.Game.input.keyboard.justReleased 67
      Ar.Asshole = true
      Ar.Game.state.start 'play', true, false

class Ar.EndState extends Phaser.State
  constructor: ->
    # ...

  create: ->
    @sound.stopAll()
    Ar.Game.camera.follow null
    Ar.Game.camera.x = 0
    Ar.Game.camera.y = 0
    Ar.Game.physics.gravity.y = 0
    title = @add.sprite 0, 0, 'end'
    title.body = null

  update: ->
    if Ar.Game.input.keyboard.justReleased 67, 100
      Ar.Game.state.start 'default'