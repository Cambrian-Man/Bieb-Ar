Ar = window.Ar ?= {}

class Ar.PlayState extends Phaser.State
  constructor: ->

  create: ->
    @loadMap 'tiles', 'screen1'

    Ar.Game.physics.gravity = new Phaser.Point 0, 5

    @player = new Ar.Player Ar.Game, 128, 128
    @add.existing @player

    @camera.follow @player

  render: ->
    super()

  preload: ->
    # Set up Stage Settings
    Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL
    Ar.Game.stage.scale.scaleFactor.setTo 2, 2
    Ar.Game.stage.scale.maxWidth = 800
    Ar.Game.stage.scale.maxHeight = 600
    Ar.Game.stage.scale.setSize()
    Ar.Game.stage.scale.refresh()

    Ar.Game.load.image 'player', 'assets/graphics/player.png'

    Ar.Game.load.tileset 'tiles', 'assets/graphics/tiles.png', 48, 48
    Ar.Game.load.tilemap 'screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON

  loadMap: (tiles, map) ->
    @map = @add.tilemap map
    @tileset = @add.tileset tiles
    @tileset.setCollisionRange 1, 2, true, true, true, true
    @tileset.setCollision 13, true, true, true, true

    @background = @add.tilemapLayer 0, 0, 400, 300, @tileset, @map, 0

    @walls = @add.tilemapLayer 0, 0, 400, 300, @tileset, @map, 1

    @walls.resizeWorld()

  update: ->
    Ar.Game.physics.collide @player, @walls