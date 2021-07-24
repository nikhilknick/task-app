const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

const { userId, userOne, setupDatabase } = require('./fixtures/db.js');

beforeEach(setupDatabase);

test('should signup a new user', async () => {
	const response = await request(app)
		.post('/users')
		.send({
			name: 'Vick',
			email: 'nyx.desdev@gmail.com',
			password: 'MyPass777!',
		})
		.expect(201);

	// Assert that the database was changed correctly
	const user = await User.findById(response.body.user._id);
	expect(user).not.toBeNull();

	// Assertions about the response
	expect(response.body.user.name).toBe('Vick');
	expect(response.body).toMatchObject({
		user: {
			name: 'Vick',
			email: 'nyx.desdev@gmail.com',
		},
		token: user.tokens[0].token,
	});
});

test('should login test user', async () => {
	const response = await request(app)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password,
		})
		.expect(200);
	const user = await User.findById(response.body.user._id);
	expect(response.body.token).toBe(user.tokens[1].token);
});

test('should not login non existent user', async () => {
	await request(app)
		.post('/users/login')
		.send({
			email: 'fakeuser@fake.com',
			password: 'fake1234567',
		})
		.expect(400);
});

test('should get profile for user', async () => {
	await request(app)
		.get('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);
});

test('should not get profile if not authenticated', async () => {
	await request(app).get('/users/me').send().expect(401);
});

test('should be able to delete account', async () => {
	await request(app)
		.delete('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	const user = await User.findById(userId);
	expect(user).toBeNull();
});

test('should not delete account for unauthenticated user', async () => {
	await request(app).delete('/users/me').send().expect(401);
});

test('should upload an avatar image', async () => {
	await request(app)
		.post('/users/me/avatar')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.attach('avatar', 'tests/fixtures/profile-pic.jpg')
		.expect(200);

	const user = await User.findById(userId);
	expect(user.avatar).toEqual(expect.any(Buffer));
});

test('should update valid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({ name: 'buck' })
		.expect(200);

	const user = await User.findById(userId);
	expect(user.name).toBe('buck');
});

test('should not update invalid user fields', async () => {
	await request(app)
		.patch('/users/me')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({ location: 'buck' })
		.expect(400);
});
