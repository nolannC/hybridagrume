const db = require('./client');

/**
 * Renvoie l'ensemble des variétés avec leurs différents taux ainsi que leur espèce et la famille associée.
 * @async
 * @returns {Array<Object>} Chaque variété et différentes informations.
 */
const findAll = async () => {
	const res = await db
		.select('cultivar.scientific_name', 'cultivar.vernacular_name', 'cultivar.family', 'variety.variety_name', 'variety.bitterness', 'variety.juiciness')
		.table('variety')
		.join('cultivar', 'variety.specimen_id', '=', 'cultivar.id');
	return res;
};

/**
 * Renvoie une variété et ces taux associé à leur id.
 * @async
 * @param {number} id - L'id recherché
 * @returns {Array<Object>} La variété et ces taux.
 */
const findOne = async id => {
	const res = await db.select('variety_name', 'bitterness', 'juiciness').table('variety').where('id', id);
	return res[0];
};

/**
 * Ajoute une variété dans la base de données
 * @async
 * @param {object} newElement - La nouvelle variété à ajouter
 * @returns {object} La nouvelle variété.
 */
const insert = async newElement => {
	const res = await db.table('variety').insert(newElement, '*');
	return res[0];
};

/**
 * Supprime un enregistrement dans la base de données
 * @async
 * @param {number} id - L'id à supprimer
 */
const destroy = async id => {
	const res = await db.table('variety').where('id', id).del('*');
	return res[0];
};

/**
 * Modifie un enregistrement
 * @async
 * @param {number} id - L'id à modifier
 * @param {object} updateElement - Les changements à effectuer
 */
const update = async (id, updateElement) => {
	const res = await db.table('variety').where('id', id).update(updateElement, '*');
	return res[0];
};

/**
 * Renvoie les enregistrements ayant l'espèce 'specimen' de manière progressive
 * @param {string} specimen - L'espèce à rechercher.
 * @returns {Array<Object>} Chaque nom de variété étant de cette espèce.
 */
const findBySpecies = async specimen => {
	const res = await db
		.select('variety_name')
		.from('variety')
		.join('cultivar', 'variety.specimen_id', '=', 'cultivar.id')
		.whereLike('vernacular_name', `%${specimen}%`);
	return res;
};

/**
 * Renvoie les enregistrements correspondant à criteria
 * @param {object} criteria - Les critères
 * @returns {Array<Object>} Les enregistrements correspondant à criteria
 */
const findBetween = async criteria => {
	const arr = [];
	Object.keys(criteria).forEach(properties => {
		Object.keys(criteria[properties]).forEach(value => {
			arr.push([properties, value === 'min' ? '>=' : '<=', criteria[properties][value].toString()]);
		});
	});

	let res = db('variety');
	res = res.select('variety_name');
	arr.forEach(async check => {
		res = res.where(check[0], check[1], check[2]);
	});
	return res;
};

module.exports = { findAll, findOne, insert, destroy, update, findBySpecies, findBetween };
