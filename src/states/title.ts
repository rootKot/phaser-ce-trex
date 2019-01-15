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
				this.game.forceSingleUpdate = true;

				this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, Assets.Images.ImagesSky2.getName());
        this.background.anchor.setTo(0.5);

				this.ground = new Ground(this.game);
				this.clouds = new Clouds(this.game);
				this.cactuses = new Cactuses(this.game);
				this.hero = new Hero(this.game);

		}

		private endGame(): void {
				this.hero.die();
				this.ground.stop();
				this.cactuses.stop();
		}

		private checkCactusCollision(): void {
				let i: string;
				let _sprite: Phaser.Sprite;
				let childrens: Phaser.Sprite[] = this.cactuses.getAll();

				let heroPositions: {x1:number, x2:number, bottom: number} = {
						x1: this.hero.x,
						x2: this.hero.x + this.hero.texture.frame.width,
						bottom: this.hero.y
				};

				for (i in childrens) {
						_sprite = childrens[i];

						heroPositions.bottom = this.hero.y;

						let cactusPositions: {x1:number, x2:number, top:number} = {
								x1: _sprite.worldPosition.x,
								x2: _sprite.worldPosition.x + _sprite.texture.frame.width,
								top: _sprite.worldPosition.y - _sprite.texture.frame.height
						};

						if (heroPositions.bottom > cactusPositions.top &&
							((heroPositions.x2 > cactusPositions.x1 && heroPositions.x2 < cactusPositions.x2) ||
			 				(heroPositions.x1 < cactusPositions.x2 && heroPositions.x1 > cactusPositions.x1)) ) {
								this.endGame();
						}
				}
		}

		public update(): void {

				this.checkCactusCollision();
		}
}
