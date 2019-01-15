import * as Assets from './assets';

export default class Hero extends Phaser.Sprite {
    private jumpSpeed: number;
    private jumpPower: number;
    private jump: boolean;
  	private jumpKey: Phaser.Key;
    private isAlive: boolean;
    private gravity: number;
    private groundY: number;

    constructor(game: Phaser.Game) {
        super(game, 0, 0, Assets.Spritesheets.SpritesheetsTRex8895.getName());
        game.add.existing(this); // ?

        this.anchor.setTo(0, 1);

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
        this.isAlive = true;

        this.y = this.groundY;
        this.x = 60;

				this.jump = false;
				this.jumpSpeed = 16;
				this.jumpPower = 0.1;
        this.gravity = 0.6;

				this.jumpKey.onDown.add(this.doJump, this);

        this.animations.play('idle');
    }

    private run(): void {
				this.animations.play('run');
		}

		private doJump(): void {
        if (this.jump) {
          return;
        }
				this.animations.play('jump');
				this.jump = true;
        this.jumpSpeed *= -1;
		}

    public die(): void {
        this.animations.play('die');
        this.isAlive = false;
    }

    public update(): void {

        if (this.jump && this.isAlive) {
						if (this.y < 110) {
								this.jumpSpeed *= -1;
								this.jumpPower = 0.1;
						}
						if (this.y > this.groundY) {
								this.jumpPower = 0.1;
								this.jump = false;
                this.y = this.groundY;
                this.jumpSpeed = Math.abs(this.jumpSpeed);
                return;
						}

            this.jumpPower += this.gravity;
						this.y += this.jumpSpeed + this.jumpPower;
				}
        else if (this.isAlive) {
			      this.run();
        }
    }
}
