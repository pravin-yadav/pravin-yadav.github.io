export const detectCollision = (ball, object) => {
	let bottomOfBall = ball.position.y + ball.size;
	let topOfBall = ball.position.y;

	let topOfObject = object.position.y;
	let bottomOfObject = object.position.y + object.height;
	let leftSideOfObject = object.position.x;
	let rightSideOfObject = object.position.x + object.width;

	if (
		bottomOfBall >= topOfObject &&
		topOfBall <= bottomOfObject &&
		ball.position.x >= leftSideOfObject &&
		ball.position.x + ball.size <= rightSideOfObject
	) {
		return true;
	}
	else {
		return false;
	}
};
