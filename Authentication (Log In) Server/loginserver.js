const express = require ("express");
const xlsx = require ("xlsx");
const filePath = "./data.xlsx";

const server = express();
const port = 1500;
const host = "localhost";

const workbook = xlsx.readFile(filePath);
const sheetNames = workbook.SheetNames;
// Get the data of "Sheet1"
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
//console.log(data);

// Welcome to website
server.get('/', (req, res) => res.send('Welcome to HCMUT_SSO Authentication'));

// Query for login
server.get('/login', (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const queryParameters = req.query;

	// For example: if you navigate to http://localhost:3000/login?username=nodejs&password=10, 
	// the req.query object will be { username: 'nodejs', password: '10' }
	//console.log(queryParameters)
	const password = queryParameters.password;
	const username = queryParameters.username;
	//console.log(password);	

	var result = data.filter((el) => (el.username == username) && (el.password == password));
	//console.log(result);
	res.end(JSON.stringify(result));
	
});
	
server.listen(port, host, () => console.log(`Example app listening at  http://${host}:${port}/`));