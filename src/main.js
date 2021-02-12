import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 500,
	backgroundColor: '#616161',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	}
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)

// game.scene.start('titlescreen')
game.scene.start('game')
