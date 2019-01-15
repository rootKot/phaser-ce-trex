import * as Assets from './assets';

export default class Clouds extends Phaser.Group {
  private gameEnd: boolean;

  constructor(game: Phaser.Game) {
      super(game);
      game.add.existing(this);
      this.create();
  }

  public stop(): void {
      this.gameEnd = true;
  }

  public create(): void {
      let cloud: Phaser.Sprite;
      let randomYPosition: number;
      let randomCreateSecond: number;

      randomYPosition = this.game.rnd.integerInRange(50, 180);
      cloud = this.game.add.sprite(this.game.world.width+100 - this.x, randomYPosition, Assets.Images.ImagesCloud.getName());
      this.add(cloud);

      randomCreateSecond = this.game.rnd.integerInRange(1, 8);
      this.game.time.events.add(Phaser.Timer.SECOND * randomCreateSecond, this.create, this);

  }

  public update(): void {
      if (this.gameEnd) {
        return;
      }
      
      this.x -= 1;
  }
}
