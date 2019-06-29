import { detectCollision } from './CollisionDetection';
import { GAME_STATE } from './constants';

export default class Ball {
	constructor(game) {
		this.image = document.getElementById('img-ball');
		this.size = 18;
		this.game = game;
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.reset();
	}
	reset = () => {
		this.speed = { x: 7, y: 5 };
		this.position = { x: 10, y: 400 };
	};

	draw = (ctx) => {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
	};
	update = (deltaTime) => {
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
			this.speed.x = -this.speed.x;
		}

		if (this.position.y < 0) {
			this.speed.y = -this.speed.y;
		}

		if (this.position.y + this.size > this.gameHeight) {
			this.game.lifeLine--;
			this.reset();
			this.game.paddle.reset();
		}

		if (detectCollision(this, this.game.paddle)) {
			this.speed.y = -this.speed.y;
			this.position.y = this.game.paddle.position.y - this.size;
		}
	};
}
