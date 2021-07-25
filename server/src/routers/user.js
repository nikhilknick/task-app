const express = require('express');
const User = require('../models/User');
const isEmpty = require('../utils/isEmpty');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account');

const router = new express.Router();

router.post('/users', async (req, res) => {
	const user = new User(req.body);
	try {
		const userExist = await User.findOne({ email: req.body.email });
		if (!userExist) {
			await user.save();
			// sendWelcomeEmail(user.email, user.name);
			const token = await user.generateAuthToken();
			res.status(201).send({ user, token });
		}
		res.status(400).send('User already exist');
	} catch (e) {
		res.status(400).send();
	}
});

router.post('/users/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.status(200).send({ user, token });
	} catch (e) {
		res.status(400).send({ error: 'Invalid creds' });
	}
});

router.post('/users/logout', auth, async (req, res) => {
	try {
		const user = req.user;
		const token = req.token;

		req.user.tokens = req.user.tokens.filter((to) => to.token !== token);

		await user.save();
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

router.post('/users/logoutAll', auth, async (req, res) => {
	try {
		req.user.tokens = [];
		await req.user.save();
		res.send();
	} catch (e) {
		res.status(500).send();
	}
});

router.get('/users/me', auth, async (req, res) => {
	res.send(req.user);
});

router.patch('/users/me', auth, async (req, res) => {
	if (isEmpty(req.body)) {
		return res.status(400).send({ error: 'Please provide a field to update' });
	}
	const updates = Object.keys(req.body);
	const allowedUpdates = ['name', 'email', 'password'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	if (!isValidOperation) {
		return res.status(400).send({ error: 'invalid updates' });
	}
	try {
		updates.forEach((update) => (req.user[update] = req.body[update]));
		await req.user.save();
		res.send(req.user);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete('/users/me', auth, async (req, res) => {
	try {
		await req.user.remove();
		// sendCancelEmail(req.user.email, req.user.name);
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please provide an jpg, jpeg or png file'));
		}
		cb(undefined, true);
	},
});

router.post(
	'/users/me/avatar',
	auth,
	upload.single('avatar'),
	async (req, res) => {
		console.log('req', req.file);
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.user.avatar = buffer;
		await req.user.save();
		res.status(200).send('Successfully saved');
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

router.delete('/users/me/avatar', auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
});

router.get('/users/:id/avatar', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set('Content-Type', 'image/png');
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send();
	}
});

module.exports = router;
