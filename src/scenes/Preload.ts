import Phaser from "phaser";

import WebFontFile from "../fonts/WebFontFile";

import { TitleScreen } from "../consts/ScenesKeys";
import * as AudioKeys from "../consts/AudioKeys";

export default class Preload extends Phaser.Scene {
  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);

    this.load.audio(AudioKeys.PongBeep, "assets/ping_pong_8bit_beeep.wav");
    this.load.audio(AudioKeys.PongPlop, "assets/ping_pong_8bit_plop.wav");
  }

  create() {
    this.scene.run(TitleScreen);
  }
}
