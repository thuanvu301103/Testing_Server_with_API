const express = require ("express");
const xlsx = require ("xlsx");
//const path = require('path');
const filePath = "./data.xlsx";

const server = express();
const port = 2000;
const host = "localhost";

var workbook = xlsx.readFile(filePath);
var sheetNames = workbook.SheetNames;
// Get the data of "Sheet1"
var data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])

function reloaddata () {
	workbook = xlsx.readFile(filePath);
	sheetNames = workbook.SheetNames;
	data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]])
}

// API: recharge account (get money to increase balance) "http://localhost:{port number}/charge?id={ID number}&charge={transaction charge}"
server.get('/charge', (req, res) => {
	reloaddata();
	res.setHeader("Content-Type", "application/json");
	const queryParameters = req.query;

	const id = queryParameters.id;
	const charge = queryParameters.charge;
	
	// Current balance
	var balance = data.filter((el) => el.ID == id)[0].balance;
	
	var new_balance = balance + charge*1;

	// POOR PERFORMENCE
	var new_data = data.map((el) => {
		//console.log(el.ID);
		if (el.ID == id) return {"ID" : el.ID, "balance": new_balance};
		else return {"ID" : el.ID, "balance": balance};
	})
	const new_worksheet = xlsx.utils.json_to_sheet(new_data);
	workbook.Sheets[sheetNames[0]] = new_worksheet;
	xlsx.writeFile(workbook, filePath);

	res.end(JSON.stringify([{"success": true, "balance": new_balance}]));
});

// API: pay transaction "http://localhost:{port number}/pay?id={ID number}&cost={transaction cost}"
server.get('/pay', (req, res) => {
	reloaddata();
	res.setHeader("Content-Type", "application/json");
	const queryParameters = req.query;

	// For example: if you navigate to http://localhost:3000/login?username=nodejs&password=10, 
	// the req.query object will be { username: 'nodejs', password: '10' }

	const id = queryParameters.id;
	const cost = queryParameters.cost;
	
	// Current balance
	var balance = data.filter((el) => el.ID == id)[0].balance;
	
	// If balance < cost => response success = false and old balance
	if (balance - cost*1 <0) {
		res.end(JSON.stringify([{"success": false, "balance": balance}]));
	}
	// If balance > cost => response success = true and new balance
	else {
		var new_balance = balance-cost*1;
	
		res.end(JSON.stringify([{"success": true, "balance": new_balance}]));

		// POOR PERFORMENCE
		var new_data = data.map((el) => {
			//console.log(el.ID);
			if (el.ID == id) return {"ID" : el.ID, "balance": new_balance};
			else return {"ID" : el.ID, "balance": balance};
		})
		const new_worksheet = xlsx.utils.json_to_sheet(new_data);
		workbook.Sheets[sheetNames[0]] = new_worksheet;
		xlsx.writeFile(workbook, filePath);
	}
	
});


// API: get balance "http://localhost:{port number}/balance?id={id number}"
server.get('/balance', (req, res) => {
	reloaddata();
	res.setHeader("Content-Type", "application/json");
	const queryParameters = req.query;
	const id = queryParameters.id;

	var result = data.filter((el) => el.ID == id);
	if (result.length == 0) res.end(JSON.stringify([{"ID": null, "balance": null}]));
	//console.log(result);
	else res.end(JSON.stringify(result));	
});
	
server.listen(port, host, () => console.log(`Example app listening at  http://${host}:${port}/`));