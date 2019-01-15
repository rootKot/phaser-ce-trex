import * as Assets from './assets';

export default class Hero extends Phaser.Sprite {
    private speed: number;
    private jumpSpeed: number;
    private jump: boolean;
  	private jumpKey: Phaser.Key;

    private groundY: number;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.Spritesheets.SpritesheetsTRex8895.getName());
        game.add.existing(this); // ?

        this.anchor.setTo(0.5, 1);
				this.scale.setTo(0.8);

        this.initAnimations();
        this.create();
    }

    private initAnimations(): void {
        this.animations.add('idle', [0], 1, false);
				this.animations.add('jump', [1], 1, false);
				this.animations.add('die', [4], 1, false);
				this.animations.add('run', [2, 3], 15, true);
    }

    private create(): void {
    		this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.groundY = this.game.world.height - 150;

        this.y = this.groundY;
        this.x = 60;

				this.jump = false;
				this.jumpSpeed = -10;
				this.speed = 5;

				this.jumpKey.onDown.add(this.doJump, this);

        this.animations.play('idle');
    }

    private run(): void {
				if (!this.jump) {
						this.animations.play('run');
				}
		}

		private doJump(): void {
				this.animations.play('jump');
				this.jump = true;
		}

    public update(): void {

        if (this.jump) {
						this.y += this.jumpSpeed;

						if (this.y < 150) {
								this.jumpSpeed *= -1;
						}
						if (this.y > this.groundY) {
								this.jumpSpeed *= -1;
								this.jump = false;
                this.y = this.groundY;
						}
				}

				this.run();
    }
}
