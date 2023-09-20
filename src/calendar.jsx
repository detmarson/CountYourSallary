
export default function Calendar() {
	const arrayOfObjects = []
	for (let id = 1; id <= 30; id++) {
		const obj = {
			id: id,
			hours: 0,
			checked: false,
		}
		arrayOfObjects.push(obj)
	}
	return arrayOfObjects
}
