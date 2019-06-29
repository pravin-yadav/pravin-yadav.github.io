import Game from './Game';

let canvas = document.getElementById('gameScreen');

let ctx = canvas.getContext('2d');

const GAME_WIDTH = 990;
const GAME_HEIGHT = 800;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

const gameLoop = (timestamp) => {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	game.update(deltaTime);
	game.draw(ctx);
	requestAnimationFrame(gameLoop);
};

gameLoop();
