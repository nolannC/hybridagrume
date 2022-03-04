const express = require('express');
const { number } = require('joi');
const router = express.Router();
const Joi = require('joi');

router.get('/', async (req, res) => {
	const { findAll } = require('../models/variety');
	res.status(200).send(await findAll());
});

router.post('/', async (req, res) => {
	const schema = Joi.object({
		variety_name: Joi.string().required(),
		bitterness: Joi.number().required(),
		juiciness: Joi.number().required(),
		specimen_id: Joi.number().required()
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const { insert } = require('../models/variety');
	const result = await insert(req.body);

	res.status(201).send(result);
});

router.get('/:id', async (req, res) => {
	const { findOne } = require('../models/variety');
	const id = parseInt(req.params.id);

	if (id !== id) {
		return res.status(400).send('Invalid id format !');
	}

	const result = await findOne(id);

	if (result.length === 0) {
		return res.status(404).send('Variety not found !');
	}

	res.status(200).send(result);
});

router.put('/:id', async (req, res) => {
	const schema = Joi.object({
		variety_name: Joi.string(),
		bitterness: Joi.number(),
		juiciness: Joi.number(),
		specimen_id: Joi.number()
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const { update } = require('../models/variety');
	const id = parseInt(req.params.id);

	if (id !== id) {
		return res.status(400).send('Invalid id format !');
	}

	const result = await update(id, req.body);

	if (result.length === 0) {
		return res.status(404).send('Variety not found !');
	}

	res.status(200).send(result);
});

router.delete('/:id', async (req, res) => {
	const { destroy } = require('../models/variety');
	const id = parseInt(req.params.id);

	if (id !== id) {
		return res.status(400).send('Invalid id format !');
	}

	const result = await destroy(id);

	if (!result) {
		return res.status(404).send('Variety not found !');
	}

	res.status(204).send();
});

router.post('/filter/scores', async (req, res) => {
	const { findBetween } = require('../models/variety');

	const schema = Joi.object({
		juiciness: Joi.object({
			min: Joi.number(),
			max: Joi.number()
		}),
		bitterness: Joi.object({
			min: Joi.number(),
			max: Joi.number()
		})
	});
	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const result = await findBetween(req.body);

	res.status(200).send(result);
});

router.get('/filter/species/:name', async (req, res) => {
	const { findBySpecies } = require('../models/variety');

	const result = await findBySpecies(req.params.name);

	res.status(200).send(result);
});

module.exports = router;
