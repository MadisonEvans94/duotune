function pathRandomizer(inputPaths, randNum) {
	function randomizeControlPoints(cp1, cp2, variance) {
		const dx = cp2[0] - cp1[0];
		const dy = cp2[1] - cp1[1];

		const randomX = Math.random() * variance - variance / 2;
		const randomY = Math.random() * variance - variance / 2;

		return [cp1[0] + dx / 2 + randomX, cp1[1] + dy / 2 + randomY];
	}

	const regex = /-?\d*\.?\d+/g;
	const variance = 20;

	let generatedPathSets = [];

	// If a single path is provided, wrap it in an array
	if (typeof inputPaths === "string") {
		inputPaths = [inputPaths];
	}

	for (let p = 0; p < inputPaths.length; p++) {
		const path = inputPaths[p];
		const coords = path.match(regex).map(parseFloat);

		let generatedPaths = [];

		for (let i = 0; i < randNum; i++) {
			let newPath = "M";

			for (let j = 0; j < coords.length; j += 6) {
				const cp1 = [coords[j], coords[j + 1]];
				const cp2 = [coords[j + 2], coords[j + 3]];
				const cp3 = [coords[j + 4], coords[j + 5]];

				const newCp1 = randomizeControlPoints(cp1, cp2, variance);
				const newCp2 = randomizeControlPoints(cp2, cp3, variance);

				newPath += `${newCp1[0]} ${newCp1[1]}C${newCp2[0]} ${newCp2[1]} `;
			}

			newPath = newPath.trim();
			generatedPaths.push(newPath);
		}

		generatedPathSets.push(generatedPaths);
	}

	// If the input was a single path, return a single array of generated paths
	if (inputPaths.length === 1) {
		return generatedPathSets[0];
	}

	// If the input was multiple paths, return the array of arrays of generated paths
	return generatedPathSets;
}
