import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private paddleLeft;
  private paddleRight;
  private ball;
  private paddleRightVelocity: Phaser.Math.Vector2;

  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
  }

  preload() {}

  create() {
    this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);

    this.physics.add.existing(this.ball);

    this.ball.body.setBounce(1, 1);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.setVelocity(
      Phaser.Math.Between(-200, 200),
      Phaser.Math.Between(-200, 200)
    );

    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);

    this.physics.add.existing(this.paddleLeft, true);
    this.physics.add.collider(this.paddleLeft, this.ball);

    this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1);

    this.physics.add.existing(this.paddleRight, true);
    this.physics.add.collider(this.paddleRight, this.ball);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 10;
    const bodyL = this.paddleLeft.body as Phaser.Physics.Arcade.StaticBody;
    const bodyR = this.paddleRight.body as Phaser.Physics.Arcade.StaticBody;
    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= speed;
      bodyL.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += speed;
      bodyL.updateFromGameObject();
    }

    const diff = this.ball.y - this.paddleRight.y;
    if (Math.abs(diff) < speed) {
      return;
    }

    const aiSpeed = 3;
    if (diff < 0) {
      this.paddleRightVelocity.y = -aiSpeed;
      if (this.paddleRightVelocity.y < -10) {
        this.paddleRightVelocity.y = -10;
      }
    } else if (diff > 0) {
      this.paddleRightVelocity.y = aiSpeed;
      if (this.paddleRightVelocity.y > 10) {
        this.paddleRightVelocity.y = 10;
      }
    }

    this.paddleRight.y += this.paddleRightVelocity.y;
    bodyR.updateFromGameObject();
  }
}
