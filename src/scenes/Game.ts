import Phaser from "phaser";

import { GameBackground, GameOver } from "../consts/ScenesKeys";
import * as Colors from "../consts/Colors";

enum GameState {
  Running,
  PlayerWon,
  AiWon,
}

export default class Game extends Phaser.Scene {
  private gameState: GameState = GameState.Running;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private paddleLeft;
  private paddleRight;
  private ball;
  private paddleRightVelocity: Phaser.Math.Vector2;
  private leftScoreLabel: Phaser.GameObjects.Text;
  private rightScoreLabel: Phaser.GameObjects.Text;
  private leftScore: number = 0;
  private rightScore: number = 0;
  private paused: boolean = false;

  init() {
    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
  }

  preload() {}

  create() {
    this.scene.run(GameBackground);
    this.scene.sendToBack(GameBackground);

    this.physics.world.setBounds(-100, 0, 1000, 500);

    this.ball = this.add.circle(400, 250, 10, Colors.White, 1);

    this.physics.add.existing(this.ball);

    this.ball.body.setBounce(1, 1);
    this.ball.body.setCollideWorldBounds(true, 1, 1);

    this.paddleLeft = this.add.rectangle(50, 250, 30, 100, Colors.White, 1);

    this.physics.add.existing(this.paddleLeft, true);
    this.physics.add.collider(this.paddleLeft, this.ball);

    this.paddleRight = this.add.rectangle(750, 250, 30, 100, Colors.White, 1);

    this.physics.add.existing(this.paddleRight, true);
    this.physics.add.collider(this.paddleRight, this.ball);

    const scoreStyle = { fontSize: "48px", fontFamily: "'Press Start 2P'" };

    this.leftScoreLabel = this.add
      .text(300, 125, "0", scoreStyle)
      .setOrigin(0.5, 0.5);

    this.rightScoreLabel = this.add
      .text(500, 375, "0", scoreStyle)
      .setOrigin(0.5, 0.5);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.time.delayedCall(1500, this.resetBall.bind(this));
  }

  update() {
    if (this.paused || this.gameState !== GameState.Running) {
      return;
    }

    this.handlePlayerInput();
    this.updateAi();
    this.checkScore();
  }

  handlePlayerInput() {
    const speed = 10;
    const bodyL = this.paddleLeft.body as Phaser.Physics.Arcade.StaticBody;

    if (this.cursors.up.isDown) {
      this.paddleLeft.y -= speed;
      bodyL.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.paddleLeft.y += speed;
      bodyL.updateFromGameObject();
    }
  }

  checkScore() {
    const x = this.ball.x;
    const leftBounds = -30;
    const rightBounds = 830;

    if (x >= leftBounds && x <= rightBounds) {
      return;
    }

    if (x < leftBounds) {
      this.incrementRightScore();
    } else if (x > rightBounds) {
      this.incrementLeftScore();
    }

    const maxScore = 7;
    if (this.leftScore >= maxScore) {
      this.gameState = GameState.PlayerWon;
    } else if (this.rightScore >= maxScore) {
      this.gameState = GameState.AiWon;
    }

    if (GameState.Running) {
      this.resetBall();
    } else {
      this.ball.active = false;
      this.physics.world.remove(this.ball.body);

      this.scene.stop(GameBackground);
      this.scene.start(GameOver, {
        leftScore: this.leftScore,
        rightScore: this.rightScore,
      });
    }
  }

  updateAi() {
    const speed = 10;
    const diff = this.ball.y - this.paddleRight.y;
    if (Math.abs(diff) < speed) {
      return;
    }

    const bodyR = this.paddleRight.body as Phaser.Physics.Arcade.StaticBody;

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

  incrementLeftScore() {
    ++this.leftScore;
    this.leftScoreLabel.setText(this.leftScore.toLocaleString());
  }

  incrementRightScore() {
    ++this.rightScore;
    this.rightScoreLabel.setText(this.rightScore.toLocaleString());
  }

  resetBall() {
    this.ball.setPosition(400, 250);

    const angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, 300);

    this.ball.body.setVelocity(vec.x, vec.y);
  }
}
