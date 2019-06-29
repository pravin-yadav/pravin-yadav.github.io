import { detectCollision } from './CollisionDetection';

export default class Bricks {
	constructor(game, position) {
		this.image = document.getElementById('img-brick');
		this.game = game;
		this.position = position;
		this.width = 110;
		this.height = 30;
		this.score = 0;
		this.shouldRemoveBrick = false;
	}

	draw = (ctx) => {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	};
	update = () => {
		if (detectCollision(this.game.ball, this)) {
			this.game.ball.speed.y = -this.game.ball.speed.y;
			this.shouldRemoveBrick = true;
		}
	};
}
