Ar = window.Ar ?= {}

class Ar.PlayState extends Phaser.State
  constructor: ->

  create: ->
    @backdrop = @add.tileSprite 0, 0, 400, 300, 'backdrop'
    @backdrop.body.allowGravity = false
    @backdrop.fixedToCamera = true

    @player = new Ar.Player Ar.Game, 128, 128

    @loadMap 'tiles', 'screen1'

    Ar.Game.physics.gravity = new Phaser.Point 0, 10
 
    @add.existing @player

    @camera.follow @player

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

    Ar.Game.load.atlasXML 'player', 'assets/graphics/player.png', 'assets/graphics/player.xml'
    Ar.Game.load.image 'fireball', 'assets/graphics/fireball.png'
    Ar.Game.load.image 'backdrop', 'assets/graphics/backdrop.png'
    Ar.Game.load.image 'squid', 'assets/graphics/squid.png'

    Ar.Game.load.tileset 'tiles', 'assets/graphics/tiles.png', 48, 48
    Ar.Game.load.tilemap 'screen1', 'assets/levels/screen1.json', null, Phaser.Tilemap.TILED_JSON
    Ar.Game.load.tilemap 'screen2', 'assets/levels/screen2.json', null, Phaser.Tilemap.TILED_JSON

  loadMap: (tiles, map) ->
    @map = @add.tilemap map
    if not @tileset?
      @tileset = @add.tileset tiles
      @tileset.setCollisionRange 1, 2, true, true, true, true
      @tileset.setCollision 10, true, true, true, true
      @tileset.setCollision 12, true, true, true, true
      @tileset.setCollision 20, true, true, true, true

    if not @background?
      @background = @add.tilemapLayer 0, 0, 400, 300, @tileset, @map, 0
    else
      @background.updateMapData @map, 0

    if not @walls?
      @walls = @add.tilemapLayer 0, 0, 400, 300, @tileset, @map, 1
    else
      @walls.updateMapData @map, 1

    @walls.resizeWorld()

    data = Ar.Game.cache.getTilemapData map

    @loadObjects(data)

  loadObjects: (data) ->
    if @fireballs?
      @fireballs.destroy()

    @fireballs = @add.group()
    @fireballs.exists = false
    @fireballSpawners = []

    if @enemies?
      @enemies.destroy()
    
    @enemies = @add.group()
    @enemies.exists = false      

    for object in data.data.layers[2].objects
      switch object.name
        when 'start'
          @player.setStart object.x, object.y + 16, object.type
          @player.respawn()
        when 'fireball'
          @fireballs.exists = true
          spawner = new Ar.FireballSpawner object.x, object.y, object.type, Number(object.properties.timer), Number(object.properties.offset), @fireballs
          @fireballSpawners.push spawner
          spawner.start()
        when 'squid'
          @enemies.exists = true
          squid = new Ar.Squid object.x, object.y
          @add.existing squid
        when 'exit'
          @exit = new Ar.Exit object.x, object.y, object.width, object.height, object.type
          @add.existing @exit

  changeMap: (to) ->
    @loadMap 'tiles', to

  update: ->
    for spawner in @fireballSpawners
      spawner.update()

    Ar.Game.physics.collide @player, @walls

    Ar.Game.physics.collide @player

    Ar.Game.physics.overlap @player, @fireballs, (player) ->
      player.respawn()
      return false
    , null, @

    Ar.Game.physics.collide @fireballs, @walls, (fireball) ->
      fireball.kill()
    , null, @

    Ar.Game.physics.overlap @player, @exit, (player, exit) ->
      @changeMap exit.target
    , null, @