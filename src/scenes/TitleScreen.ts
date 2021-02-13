import Phaser from "phaser";

import { Game } from "../consts/ScenesKeys";
import * as AudioKeys from "../consts/AudioKeys";

export default class TitleScreen extends Phaser.Scene {
  preload() {}

  create() {
    this.add
      .text(400, 250, "Old Scholl Tennis", {
        fontSize: "38px",
        fontFamily: "'Press Start 2P'",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 300, "Press Space to Start", {
        fontFamily: "'Press Start 2P'",
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.sound.play(AudioKeys.PongBeep);
      this.scene.start(Game);
    });
  }
}
