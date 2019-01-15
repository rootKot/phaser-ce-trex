import * as Assets from './assets';

export default class Cactuses extends Phaser.Group {

  private gameEnd: boolean;

  constructor(game: Phaser.Game) {
      super(game);
      game.add.existing(this);
      this.create();
  }

  public create(): void {
      let sprite: string;
      let endFrame: number;
      let randomCreateSecond: number;
      let cactus: Phaser.Sprite;

      if (this.game.rnd.integerInRange(0,1)) {
        sprite = Assets.Spritesheets.SpritesheetsCactus13470.getName();
        endFrame = 5;
      }
      else {
        sprite = Assets.Spritesheets.SpritesheetsCactus249100.getName();
        endFrame = 3;
      }

      cactus = this.game.add.sprite(this.game.world.width+100 - this.x, this.game.world.height-160, sprite);
      cactus.frame = this.game.rnd.integerInRange(0, endFrame);
      cactus.anchor.setTo(0, 1);
      this.add(cactus);

      // console.log(this.getAll()[0].worldPosition);
      // console.log(this.getAll()[0].texture.frame);

      randomCreateSecond = this.game.rnd.integerInRange(1, 3) + this.game.rnd.frac();
      this.game.time.events.add(Phaser.Timer.SECOND * randomCreateSecond, this.create, this);
  }

  public stop(): void {
      this.gameEnd = true;
  }

  public update(): void {
      if (this.gameEnd) {
        return;
      }

      this.x -= 5;

      let i: string;
      let _sprite: Phaser.Sprite;
      let childrens: Phaser.Sprite[] = this.getAll();

      for (i in childrens) {
        _sprite = childrens[i];

        if (_sprite.worldPosition.x + _sprite.texture.frame.width < 0) {
            _sprite.destroy();
        }
      }
  }
}
