import Phaser from "phaser";

import { TitleScreen } from "../consts/ScenesKeys";
import { PressStartP2 } from "../consts/Fonts";

export default class GameOver extends Phaser.Scene {
  /**
   *
   * @param data {{ leftScore: number, rightScore: number }}
   */
  create(data) {
    let titleLabel = "Game Over";
    if (data.leftScore > data.rightScore) {
      titleLabel = "You win!";
    }

    this.add
      .text(400, 250, titleLabel, {
        fontSize: "38px",
        fontFamily: PressStartP2,
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 300, "Press Space to Continue", {
        fontFamily: PressStartP2,
      })
      .setOrigin(0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(TitleScreen);
    });
  }
}
