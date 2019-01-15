import * as Assets from './assets';

export default class Ground extends Phaser.TileSprite {

  constructor(game: Phaser.Game) {
      super(game, 0, game.world.height-180, 100000, 29, Assets.Images.ImagesGround.getName());
      game.add.existing(this);
  }

  public update(): void {
      this.x -= 5;
  }
}
