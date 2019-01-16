import * as Assets from './assets';

export default class Birds extends Phaser.Group {

  private gameEnd: boolean;

  constructor(game: Phaser.Game) {
      super(game);
      game.add.existing(this);
      this.create();
  }

  public create(): void {
      let randomCreateSecond: number;
      let randomBirdY: number;
      let bird: Phaser.Sprite;

      randomBirdY = this.game.rnd.integerInRange(100, 250);

      bird = this.game.add.sprite(this.game.world.width+100 - this.x, randomBirdY, Assets.Spritesheets.SpritesheetsBird9382.getName());
      bird.animations.add('fly', [0, 1], 7, true);
      bird.animations.play('fly');
      bird.frame = this.game.rnd.integerInRange(0, 1);
      bird.anchor.setTo(0, 1);
      this.add(bird);

      // console.log(this.getAll()[0].worldPosition);
      // console.log(this.getAll()[0].texture.frame);

      randomCreateSecond = this.game.rnd.integerInRange(2, 3) + this.game.rnd.frac();
      this.game.time.events.add(Phaser.Timer.SECOND * randomCreateSecond, this.create, this);
  }

  public stop(): void {
      this.gameEnd = true;

      this.callAll('animations.stop', 'animations');
  }

  public update(): void {
      if (this.gameEnd) {
        return;
      }

      this.x -= 7;

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
