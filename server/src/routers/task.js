const express = require('express');
const Task = require('../models/Task');
const isEmpty = require('../utils/isEmpty');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
	const sort = {};
	const match = {};
	if (req.query.completed) {
		match.completed = req.query.completed === 'true';
	}
	if (req.query.sortBy) {
		const sortType = req.query.sortBy.split(':')[0];
		const sortMethod = req.query.sortBy.split(':')[1] === 'desc' ? -1 : 1;
		sort[sortType] = sortMethod;
	}
	try {
		await req.user
			.populate({
				path: 'tasks',
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.execPopulate();
		res.send(req.user.tasks);
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
	if (isEmpty(req.body)) {
		return res.status(400).send({ error: 'Please provide a field to update' });
	}
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates' });
	}

	try {
		const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
		if (!task) {
			return res.status(404).send();
		}
		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
		if (!task) {
			res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
