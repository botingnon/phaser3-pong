import Phaser from "phaser";

import WebFontFile from "../fonts/WebFontFile";

import { TitleScreen } from "../consts/ScenesKeys";

export default class Preload extends Phaser.Scene {
  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }

  create() {
    this.scene.run(TitleScreen);
  }
}
