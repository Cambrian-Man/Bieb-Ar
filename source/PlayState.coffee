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

    @border = @add.sprite 0, 0, 'border'
    @border.body = null
    @border.fixedToCamera = true

    @text = new Ar.Text @player
    @add.existing @text

    @music = @add.audio 'music', 1, true
    @music.play '', 0, 1, true

  render: ->
    @backdrop.tilePosition.x = -(@camera.x / 3)
    super()

  loadMap: (tiles, map) ->
    @map = @add.tilemap map
    if not @tileset?
      @tileset = @add.tileset tiles
      @tileset.setCollisionRange 1, 2, true, true, true, true
      @tileset.setCollision 10, true, true, true, true
      @tileset.setCollision 12, true, true, true, true
      @tileset.setCollision 20, true, true, true, true
      @tileset.setCollisionRange 31, 33, true, true, true, true
      @tileset.setCollisionRange 40, 41, true, true, true, true

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

    if @border?
      @border.bringToTop()

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
          @player.setStart object.x, object.y, object.type
          @player.respawn()
        when 'fireball'
          @fireballs.exists = true
          spawner = new Ar.FireballSpawner object.x, object.y, object.type, Number(object.properties.timer), Number(object.properties.offset), @fireballs
          @fireballSpawners.push spawner
          spawner.start()
        when 'squid'
          @enemies.exists = true
          squid = new Ar.Squid object.x, object.y
          @enemies.add squid
        when 'exit'
          @exit = new Ar.Exit object.x, object.y, object.width, object.height, object.type
          @add.existing @exit
        when 'end'
          @end = @add.sprite object.x, object.y, new Phaser.BitmapData(Ar.Game, object.width, object.height)
          @end.body.allowGravity = false

  changeMap: (to) ->
    @loadMap 'tiles', to

  update: ->
    for spawner in @fireballSpawners
      spawner.update()

    Ar.Game.physics.collide @player, @walls

    Ar.Game.physics.collide @player

    Ar.Game.physics.collide @enemies, @walls

    Ar.Game.physics.overlap @player, @fireballs, (player) ->
      if not player.invincible then player.kill()
    , null, @

    Ar.Game.physics.overlap @player, @enemies, (player) ->
      if not player.invincible then player.kill()
    , null, @

    Ar.Game.physics.collide @fireballs, @walls, (fireball) ->
      fireball.kill()
    , null, @

    Ar.Game.physics.overlap @player, @exit, (player, exit) ->
      @changeMap exit.target
    , null, @

    if @end?
      Ar.Game.physics.overlap @player, @end, ->
        Ar.Game.state.start 'end'
      , null, @