Ar = window.Ar ?= {}

class Ar.Player extends Phaser.Sprite
  constructor: (game, x, y) ->
    super(game, x, y, 'player')