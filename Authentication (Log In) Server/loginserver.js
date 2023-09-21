const express = require ("express");

const server = express();
const port = 1500;
const host = "localhost";

// Welcome to website
server.get('/', (req, res) => res.send('Welcome to HCMUT_SSO Authentication'));

// Query for login
server.get('/login', (req, res) => {
	const queryParameters = req.query;
	// For example: if you navigate to http://localhost:3000/login?username=nodejs&password=10, 
	// the req.query object will be { username: 'nodejs', password: '10' }
	// console.log(queryParameters)	check
	const password = queryParameters.
});
	
server.listen(port, host, () => console.log(`Example app listening at  http://${host}:${port}/`));