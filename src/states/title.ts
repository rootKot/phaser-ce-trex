import * as Assets from '../assets';
import Hero from '../hero';
import Ground from '../ground';
import Cactuses from '../cactuses';
import Clouds from '../clouds';

export default class Title extends Phaser.State {

		private background: Phaser.Sprite;
		private ground: Ground;
		private clouds: Clouds;
		private cactuses: Cactuses;
		private hero: Hero;

		public create(): void {
				this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, Assets.Images.ImagesSky2.getName());
        this.background.anchor.setTo(0.5);

				this.ground = new Ground(this.game);
				this.clouds = new Clouds(this.game);
				this.cactuses = new Cactuses(this.game);
				this.hero = new Hero(this.game);

		}

		public update(): void {
		}
}
