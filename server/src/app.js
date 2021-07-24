require('../config/setEnvironment');
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect

	var allowedOrigins = [
		'http://localhost:3000',
		'http://localhost:3001',
	];

	var origin = req.headers.origin;

	if (allowedOrigins.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Request-Headers', origin);
	}

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware

	next();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
