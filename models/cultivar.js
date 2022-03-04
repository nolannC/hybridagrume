const db = require('./client');

/**
 * Renvoie l'ensemble des espèces avec leurs familles.
 * @async
 * @returns {Array<Object>} Chaque espèce et sa famille.
 */
const findAll = async () => {
	const res = await db.select('scientific_name', 'vernacular_name', 'family').table('cultivar');
	return res;
};

/**
 * Renvoie une espèce et sa famille correspondant à leur id.
 * @async
 * @param {number} id - L'id recherché
 * @returns {Array<Object>} L'espèce et sa famille
 */
const findOne = async id => {
	const res = await db.select().table('cultivar').where('id', id);
	return res[0];
};

/**
 * Ajoute une espèce dans la base de données
 * @async
 * @param {object} newElement - La nouvelle espèce à ajouter
 */
const insert = async newElement => {
	return await db.table('cultivar').insert(newElement, '*');
};

/**
 * Supprime un enregistrement dans la base de données
 * @async
 * @param {number} id - L'id à supprimer
 */
const destroy = async id => {
	const res = await db.table('cultivar').where('id', id).del('*');
	return res[0];
};

/**
 * Modifie un enregistrement
 * @async
 * @param {number} id - L'id à modifier
 * @param {object} updateElement - Les changements à effectuer
 */
const update = async (id, updateElement) => {
	const res = await db.table('cultivar').where('id', id).update(updateElement, '*');
	return res[0];
};

/**
 * Renvoie les enregistrements ayant la famille 'family' de manière progressive
 * @param {string} family - La famille à rechercher.
 * @returns {Array<Object>} Chaque enregistrement ayant cette famille.
 */
const findByFamily = async family => {
	return await db.select().from('cultivar').whereLike(db.raw('family::text'), `%${family}%`);
};

module.exports = { findAll, findOne, insert, destroy, update, findByFamily };
