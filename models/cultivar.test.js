const { findAll, findOne, findByFamily } = require('./cultivar');

test('Test findAll models/cultivar.js', async () => {
	const data = await findAll();

	expect(data).toBeInstanceOf(Array);

	expect(data[0]).toHaveProperty('scientific_name');
	expect(data[0]).toHaveProperty('vernacular_name');
	expect(data[0]).toHaveProperty('family');
});

test('Test findOne models/variety.js', async () => {
	const data = await findOne(1);

	expect(data).toHaveProperty('scientific_name');
	expect(data).toHaveProperty('vernacular_name');
	expect(data).toHaveProperty('family');
});

test('Test findByFamily models/variety.js', async () => {
	const data = await findByFamily('orange');
	expect(data).toBeInstanceOf(Array);
});
