import Bricks from './Bricks';

export const buildLevel = (game, level) => {
	let bricks = [];
	level.forEach((row, rowIndex) => {
		row.forEach((brick, brickIndex) => {
			if (brick === 1) {
				let position = {
					x: 110 * brickIndex,
					y: 100 + 30 * rowIndex
				};
				bricks.push(new Bricks(game, position));
			}
		});
	});
	return bricks;
};
export const level1 = [
	[ 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];

export const level2 = [
	[ 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
	[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
];
