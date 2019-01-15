import * as Assets from './assets';

export default class Ground extends Phaser.TileSprite {
  private gameEnd: boolean;

  constructor(game: Phaser.Game) {
      super(game, 0, game.world.height-180, 10000, 29, Assets.Images.ImagesGround.getName());
      game.add.existing(this);
  }

  public stop(): void {
      this.gameEnd = true;
  }

  public update(): void {
      if (this.gameEnd) {
        return;
      }
      this.x -= 5;
  }
}
