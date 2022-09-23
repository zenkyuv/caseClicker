export const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const rand = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min;
}