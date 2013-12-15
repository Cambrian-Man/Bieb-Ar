Ar = window.Ar ?= {}

class Ar.PlayState extends Phaser.State
  constructor: ->

  create: ->
    @backdrop = @add.tileSprite 0, 0, 400, 300, 'backdrop'
    @backdrop.body.allowGravity = false
    @backdrop.fixedToCamera = true

    @loadMap 'tiles', 'screen1'

    Ar.Game.physics.gravity = new Phaser.Point 0, 10

    @player = new Ar.Player Ar.Game, 128, 128
    @add.existing @player

    @camera.follow @player

    @fireballs = @add.group()
    @fireballSpawners = []
    for object in @data.data.layers[2].objects
      switch object.name
        when 'start'
          @player.start.setTo object.x, object.y + 6
          @player.respawn()
        when 'fireball'
          spawner = new Ar.FireballSpawner object.x, object.y, object.type, Number(object.properties.timer), Number(object.properties.offset), @fireballs
          @fireballSpawners.push spawner
          spawner.start()

  render: ->
    @backdrop.tilePosition.x = -(@camera.x / 3)
    # Ar.Game.debug.renderSpriteBody(@player);
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
    Ar.Game.load.image 'fireball', 'assets/graphics/fireball.png'
    Ar.Game.load.image 'backdrop', 'assets/graphics/backdrop.png'

    Ar.Game.load.tileset 'tiles', 'assets/graphics/tiles.png', 48, 48
    Ar.Game.load.tilemap 'screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON

  loadMap: (tiles, map) ->
    @map = @add.tilemap map
    @tileset = @add.tileset tiles
    @tileset.setCollisionRange 1, 2, true, true, true, true
    @tileset.setCollision 10, true, true, true, true
    @tileset.setCollision 12, true, true, true, true

    @background = @add.tilemapLayer 0, 0, 400, 300, @tileset, @map, 0

    @walls = @add.tilemapLayer 0, 0, 400, 300, @tileset, @map, 1

    @walls.resizeWorld()

    @data = Ar.Game.cache.getTilemapData map

  update: ->
    for spawner in @fireballSpawners
      spawner.update()

    Ar.Game.physics.collide @player, @walls

    Ar.Game.physics.collide @player

    Ar.Game.physics.collide @player, @fireballs, (player) ->
      player.respawn()
      return false
    , null, @

    Ar.Game.physics.collide @fireballs, @walls, (fireball) ->
      fireball.kill()
    , null, @