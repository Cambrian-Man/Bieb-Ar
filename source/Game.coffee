Ar = window.Ar ?= {}

Ar.Asshole = false

Ar.Game = new Phaser.Game 400, 300, Phaser.AUTO, 'bieb-ar', new Ar.TitleState(), false, false
Ar.Game.state.add 'end', new Ar.EndState(), false
Ar.Game.state.add 'play', new Ar.PlayState(), false