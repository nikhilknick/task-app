const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/Task');
const { userId, userOne, setupDatabase, taskOne, taskThree, userTwo } = require('./fixtures/db.js');

beforeEach(setupDatabase);

test('should create a task', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'from my test',
		})
		.expect(201);

	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toEqual(false);
});

test('get tasks', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body.length).toBe(2);
});

test('attempt unauthorized user to delete task', async () => {
	await request(app)
		.delete(`/tasks/${taskThree._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(404);

	const task = await Task.findById(taskThree._id);
	expect(task).not.toBeNull();
});

test('should update a specific task by id', async () => {
	await request(app)
		.patch(`/tasks/${taskThree._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send({
			description: 'updated task',
		})
		.expect(200);
});
