import Phaser from 'phaser'

import Preload from './scenes/Preload'
import TitleScreen from './scenes/TitleScreen'
import Game from './scenes/Game'
import GameBackground from './scenes/GameBackground'
import GameOver from './scenes/GameOver'

import * as ScenesKeys from "./consts/ScenesKeys"

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 500,
	// backgroundColor: '#616161',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	}
}

const game = new Phaser.Game(config)

game.scene.add(ScenesKeys.Preload, Preload)
game.scene.add(ScenesKeys.TitleScreen, TitleScreen)
game.scene.add(ScenesKeys.Game, Game)
game.scene.add(ScenesKeys.GameBackground, GameBackground)
game.scene.add(ScenesKeys.GameOver, GameOver)

game.scene.start(ScenesKeys.Preload)
