import * as Assets from './assets';

export default class Cactuses extends Phaser.Group {
  private cactus: Phaser.Sprite;
  private randomCreateSecond: number;

  constructor(game: Phaser.Game) {
      super(game);
      game.add.existing(this);
      this.create();
  }

  public create(): void {
      if (this.game.rnd.integerInRange(0,1)) {
        this.cactus = this.game.add.sprite(this.game.world.width+100 - this.x, this.game.world.height-160, Assets.Spritesheets.SpritesheetsCactus13470.getName());
        this.cactus.frame = this.game.rnd.integerInRange(0, 5);
      }
      else {
        this.cactus = this.game.add.sprite(this.game.world.width+100 - this.x, this.game.world.height-160, Assets.Spritesheets.SpritesheetsCactus249100.getName());
        this.cactus.frame = this.game.rnd.integerInRange(0, 3);
      }
      this.cactus.anchor.setTo(0.5, 1);
      this.add(this.cactus);

      this.randomCreateSecond = this.game.rnd.integerInRange(1, 2) + this.game.rnd.frac();
      this.game.time.events.add(Phaser.Timer.SECOND * this.randomCreateSecond, this.create, this);
  }

  public update(): void {
      this.x -= 5;
  }
}
