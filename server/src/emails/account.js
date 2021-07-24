const nodemailer = require('nodemailer');

const transportInfo = {
	host: process.env.HOSTINGER_HOST_URL,
	port: process.env.HOSTINGER_PORT,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.HOSTINGER_AUTH_EMAIL, // generated ethereal user
		pass: process.env.HOSTINGER_AUTH_PASS, // generated ethereal password
	},
};

const sendWelcomeEmail = async (email, name) => {
	let transporter = nodemailer.createTransport(transportInfo);
	let info = await transporter.sendMail({
		from: '"Nikhil Arya" <nikhil.arya@crazybends.com>', // sender address
		to: email, // list of receivers
		subject: 'Hello ✔', // Subject line
		text: `Hello world ${name} !`, // plain text body
		html: `<b>Welcome ${name} to the task app</b>`, // html body
	});

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

const sendCancelEmail = async (email, name) => {
	let transporter = nodemailer.createTransport(transportInfo);
	let info = await transporter.sendMail({
		from: '"Nikhil Arya" <nikhil.arya@crazybends.com>', // sender address
		to: email, // list of receivers
		subject: 'Hello ✔', // Subject line
		text: `Hello world ${name} !`, // plain text body
		html: `<b>GoodBye ${name}</b>`, // html body
	});

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = {
	sendWelcomeEmail,
	sendCancelEmail,
};
