const express = require('express');
const { number } = require('joi');
const router = express.Router();
const Joi = require('joi');

router.get('/', async (req, res) => {
	const { findAll } = require('../models/cultivar');
	res.status(200).send(await findAll());
});

router.post('/', async (req, res) => {
	const schema = Joi.object({
		scientific_name: Joi.string().required(),
		vernacular_name: Joi.string().required(),
		family: Joi.string().required()
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const { insert } = require('../models/cultivar');
	const result = await insert(req.body);

	res.status(201).send(result);
});

router.get('/:id', async (req, res) => {
	const { findOne } = require('../models/cultivar');
	const id = parseInt(req.params.id);

	if (id !== id) {
		return res.status(400).send('Invalid id format !');
	}

	const result = await findOne(id);

	if (!result) {
		return res.status(404).send('cultivar not found !');
	}

	res.status(200).send(result);
});

router.put('/:id', async (req, res) => {
	const schema = Joi.object({
		scientific_name: Joi.string(),
		vernacular_name: Joi.string(),
		family: Joi.string()
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const { update } = require('../models/cultivar');
	const id = parseInt(req.params.id);

	if (id !== id) {
		return res.status(400).send('Invalid id format !');
	}

	const result = await update(id, req.body);

	if (result.length === 0) {
		return res.status(404).send('cultivar not found !');
	}

	res.status(200).send(result);
});

router.delete('/:id', async (req, res) => {
	const { destroy } = require('../models/cultivar');
	const id = parseInt(req.params.id);

	if (id !== id) {
		return res.status(400).send('Invalid id format !');
	}

	const result = await destroy(id);

	if (!result) {
		return res.status(404).send('cultivar not found !');
	}

	res.status(204).send();
});

router.get('/filter/family/:name', async (req, res) => {
	const { findByFamily } = require('../models/cultivar');

	const result = await findByFamily(req.params.name);

	res.status(200).send(result);
});

module.exports = router;
