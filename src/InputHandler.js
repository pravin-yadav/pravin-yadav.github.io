import { GAME_STATE } from './constants';

export default class InputHandler {
	constructor(paddle, game) {
		document.addEventListener('keydown', (event) => {
			switch (event.keyCode) {
				case 37:
					paddle.moveLeft();
					break;

				case 39:
					paddle.moveRight();
					break;
				case 27:
					game.gameState !== GAME_STATE.GAME_OVER && game.gameState !== GAME_STATE.GAME_MENU && game.togglePause();
					break;
				case 32:

						game.gameState === GAME_STATE.GAME_OVER ? game.restart() :
						game.start();
					break;
				default:
					break;
			}
		});

		document.addEventListener('keyup', (event) => {
			switch (event.keyCode) {
				case 37:
					if (paddle.speed < 0) paddle.stop();
					break;

				case 39:
					if (paddle.speed > 0) paddle.stop();
					break;

				default:
					break;
			}
		});
	}
}
