import * as Assets from './assets';

export default class Gameover extends Phaser.Group {

  constructor (game: Phaser.Game) {
      super(game);
      this.create();
  }

  public create() {
      this.x = this.game.world.centerX
      this.y = this.game.world.centerY;

      let text = this.game.add.sprite(0, -180, Assets.Images.ImagesGameover.getName());
      text.anchor.setTo(0.5, 0.5);
      this.add(text);

      let replayBtn = this.game.add.button(0, -100, Assets.Images.ImagesReplay.getName(), this.replay);
      replayBtn.anchor.setTo(0.5, 0.5);
      replayBtn.scale.setTo(0.6);
      this.add(replayBtn);
  }

  private replay() {
      this.game.state.start(this.game.state.current);
  }
}
