const { findAll, findOne, findBySpecies, findBetween } = require('./variety');

test('Test findAll models/variety.js', async () => {
	const data = await findAll();

	expect(data).toBeInstanceOf(Array);

	expect(data[0]).toHaveProperty('scientific_name');
	expect(data[0]).toHaveProperty('vernacular_name');
	expect(data[0]).toHaveProperty('family');
	expect(data[0]).toHaveProperty('variety_name');
	expect(data[0]).toHaveProperty('bitterness');
	expect(data[0]).toHaveProperty('juiciness');
});

test('Test findOne models/variety.js', async () => {
	const data = await findOne(1);

	expect(data).toHaveProperty('variety_name');
	expect(data).toHaveProperty('bitterness');
	expect(data).toHaveProperty('juiciness');
});

test('Test findBySpecies models/variety.js', async () => {
	const data = await findBySpecies('citr');
	expect(data).toBeInstanceOf(Array);
	expect(data[0]).toHaveProperty('variety_name');
});

test('Test findBetween models/variety.js', async () => {
	const data = await findBetween({ bitterness: { min: 1, max: 4 }, juiciness: { min: 1, max: 1 } });
	expect(data).toBeInstanceOf(Array);
});
