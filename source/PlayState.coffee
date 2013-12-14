Ar = window.Ar ?= {}

class Ar.PlayState extends Phaser.State
  constructor: ->

  create: ->
    player = new Ar.Player Ar.Game, 128, 128
    @add.existing player

  render: ->
    super()

  preload: ->
    Ar.Game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL
    Ar.Game.stage.scale.scaleFactor.setTo 2, 2
    Ar.Game.stage.scale.maxWidth = 800
    Ar.Game.stage.scale.maxHeight = 600
    Ar.Game.stage.scale.setSize()
    Ar.Game.stage.scale.refresh()

    Ar.Game.load.image 'player', 'assets/gfx/player.png'