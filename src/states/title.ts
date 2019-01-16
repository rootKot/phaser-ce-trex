import * as Assets from '../assets';
import Hero from '../hero';
import Ground from '../ground';
import Cactuses from '../cactuses';
import Birds from '../birds';
import Clouds from '../clouds';
import Gameover from '../gameover';

export default class Title extends Phaser.State {

		private background: Phaser.Sprite;
		private ground: Ground;
		private clouds: Clouds;
		private cactuses: Cactuses;
		private birds: Birds;
		private hero: Hero;
		private gameover: Gameover;

		public create(): void {
				this.game.forceSingleUpdate = true;

				this.background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, Assets.Images.ImagesSky.getName());
        this.background.anchor.setTo(0.5);

				this.ground = new Ground(this.game);
				this.clouds = new Clouds(this.game);
				this.cactuses = new Cactuses(this.game);
				this.birds = new Birds(this.game);
				this.hero = new Hero(this.game);

		}

		private endGame(): void {
				this.hero.die();
				this.ground.stop();
				this.cactuses.stop();
				this.birds.stop();

				this.gameover = new Gameover(this.game);
		}

		private checkEnemyCollision(enemy:Phaser.Group): void {
				let i: string;
				let _sprite: Phaser.Sprite;
				let childrens: Phaser.Sprite[] = enemy.getAll();

				for (i in childrens) {
						_sprite = childrens[i];

						let heroPositions: {x1:number, x2:number, y1: number, y2: number} = {
								x1: this.hero.x,
								x2: this.hero.x + this.hero.texture.frame.width,
								y1: this.hero.y,
								y2: this.hero.y - this.hero.texture.frame.height
						};

						let enemyPositions: {x1:number, x2:number, y1: number, y2: number} = {
								x1: _sprite.worldPosition.x,
								x2: _sprite.worldPosition.x + _sprite.texture.frame.width,
								y1: _sprite.worldPosition.y,
								y2: _sprite.worldPosition.y - _sprite.texture.frame.height,
						};

						if ( ((heroPositions.x2 > enemyPositions.x1 && heroPositions.x2 < enemyPositions.x2) ||
			 				(heroPositions.x1 < enemyPositions.x2 && heroPositions.x1 > enemyPositions.x1 )) &&
							( ((heroPositions.y2 >= enemyPositions.y2 && heroPositions.y2 <= enemyPositions.y1) ||
			 				(heroPositions.y1 <= enemyPositions.y2 && heroPositions.y1 >= enemyPositions.y1) ||
							(enemyPositions.y1 <= heroPositions.y1 && enemyPositions.y2 >= heroPositions.y2 ))) ) {
								this.endGame();
						}
				}
		}

		public update(): void {

				this.checkEnemyCollision(this.cactuses);
				this.checkEnemyCollision(this.birds);
		}
}
