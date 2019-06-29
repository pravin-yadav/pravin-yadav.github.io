import Paddle from './Paddle';
import Ball from './Ball';
import InputHandler from './InputHandler';
import { buildLevel, level1, level2 } from './Levels';
import { GAME_STATE } from './constants';

export default class Game {
	constructor(gameWidth, gameHeight) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gameState = GAME_STATE.GAME_MENU;
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		this.bricks = [];
		this.gameObjects = [];
		this.lifeLine = 3;
		this.levels = [ level1, level2 ];
		this.currentLevel = 0;
		new InputHandler(this.paddle, this);
	}

	start = () => {
		if (
			this.gameState !== GAME_STATE.GAME_MENU &&
			this.gameState !== GAME_STATE.GAME_NEW_LEVEL &&
			this.gameState !== GAME_STATE.GAME_RESTART
		)
			return;
		this.bricks = buildLevel(this, this.levels[this.currentLevel]);
		this.ball.reset();
		this.paddle.reset();
		this.gameObjects = [ this.paddle, this.ball ];
		this.gameState = GAME_STATE.GAME_RUNNING;
	};

	update = (deltaTime) => {
		if (this.lifeLine === 0) this.gameState = GAME_STATE.GAME_OVER;
		if (
			this.gameState === GAME_STATE.GAME_PAUSED ||
			this.gameState === GAME_STATE.GAME_MENU ||
			this.gameState === GAME_STATE.GAME_OVER
		)
			return;

		if (this.bricks.length === 0 && this.gameState !== GAME_STATE.GAME_RESTART) {
			this.currentLevel++;
			this.gameState = GAME_STATE.GAME_NEW_LEVEL;
			this.start();
		}

		[ ...this.gameObjects, ...this.bricks ].forEach((object) => object.update(deltaTime));
		this.bricks = this.bricks.filter((brick) => !brick.shouldRemoveBrick);
	};

	draw = (ctx) => {
		[ ...this.gameObjects, ...this.bricks ].forEach((object) => object.draw(ctx));

		if (this.gameState === GAME_STATE.GAME_PAUSED) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,0.7)';
			ctx.fill();
			ctx.font = '60px Arial';
			ctx.fillStyle = '#FFF';
			ctx.textAlign = 'center';
			ctx.fillText('Game Paused', this.gameWidth / 2, this.gameHeight / 2);
		}

		if (this.gameState === GAME_STATE.GAME_MENU) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();
			ctx.font = '40px Arial';
			ctx.fillStyle = '#FFF';
			ctx.textAlign = 'center';
			ctx.fillText('Press SPACEBAR To Start', this.gameWidth / 2, this.gameHeight / 2);
		}

		if (this.gameState === GAME_STATE.GAME_OVER) {
			ctx.rect(0, 0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = 'rgba(0,0,0,1)';
			ctx.fill();
			ctx.font = '40px Arial';
			ctx.fillStyle = '#FFF';
			ctx.textAlign = 'center';
			ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2);
			ctx.font = '20px Arial';
			ctx.fillText('Press SPACEBAR To Play Again', this.gameWidth / 2, 780);
		}

		if (this.gameState === GAME_STATE.GAME_RUNNING) {
			ctx.font = '25px Arial';
			ctx.fillStyle = '#000';
			ctx.fillText(this.lifeLine !== 0 && `Lifeline : ${this.lifeLine}`, 900, 30);
		}
	};

	togglePause = () => {
		if (this.gameState === GAME_STATE.GAME_PAUSED) {
			this.gameState = GAME_STATE.GAME_RUNNING;
		}
		else {
			this.gameState = GAME_STATE.GAME_PAUSED;
		}
	};
	restart = () => {
		this.gameState = GAME_STATE.GAME_RESTART;
		this.lifeLine = 3;
		this.start();
	};
}
