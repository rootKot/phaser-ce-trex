import * as Assets from './assets';

export default class Clouds extends Phaser.Group {
  private cloud: Phaser.Sprite;
  private randomYPosition: number;
  private randomCreateSecond: number;

  constructor(game: Phaser.Game) {
      super(game);
      game.add.existing(this);
      this.create();
  }

  public create(): void {
      this.randomYPosition = this.game.rnd.integerInRange(50, 180);
      this.cloud = this.game.add.sprite(this.game.world.width+100 - this.x, this.randomYPosition, Assets.Images.ImagesCloud.getName());
      this.add(this.cloud);

      this.randomCreateSecond = this.game.rnd.integerInRange(1, 8);
      this.game.time.events.add(Phaser.Timer.SECOND * this.randomCreateSecond, this.create, this);

  }

  public update(): void {
      this.x -= 1;
  }
}
