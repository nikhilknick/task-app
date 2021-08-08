const app = require('./app');
const port = process.env.PORT;

app.listen(3090, () => {
	console.log(`Server is running on port 3090`);
});
