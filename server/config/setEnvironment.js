const setEnvironment = require('dotenv-flow').config({
	node_env: process.env.NODE_ENV,
});

if (setEnvironment.error) {
	console.log('Unable to set Environment Variables.');
	console.log(setEnvironment.error);
} else {
	console.log('Environment Variables set.');
}
