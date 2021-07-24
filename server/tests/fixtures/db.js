const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/User');
const Task = require('../../src/models/Task');

const userId = new mongoose.Types.ObjectId();

const userOne = {
	_id: userId,
	email: 'test@test.com',
	password: 'test1234567',
	name: 'test',
	tokens: [
		{
			token: jwt.sign({ _id: userId }, process.env.JWT_SECRET),
		},
	],
};

const userTwoId = new mongoose.Types.ObjectId();

const userTwo = {
	_id: userTwoId,
	email: 'jess@test.com',
	password: 'jess1234567',
	name: 'jess',
	tokens: [
		{
			token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
		},
	],
};

const taskOne = {
	_id: new mongoose.Types.ObjectId(),
	description: 'First task',
	completed: false,
	owner: userOne._id,
};

const taskTwo = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Second task',
	completed: true,
	owner: userOne._id,
};

const taskThree = {
	_id: new mongoose.Types.ObjectId(),
	description: 'Third task',
	completed: false,
	owner: userTwo._id,
};

const setupDatabase = async () => {
	await User.deleteMany();
	await Task.deleteMany();
	await new User(userOne).save();
	await new User(userTwo).save();
	await new Task(taskOne).save();
	await new Task(taskTwo).save();
	await new Task(taskThree).save();
};

module.exports = {
	userId,
	userOne,
	taskOne,
	taskThree,
	setupDatabase,
	userTwo,
};
