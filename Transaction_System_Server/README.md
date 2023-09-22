## Introduction
- Transaction Server is a simple money-trading server
- This server provide API for the third party
- The data (ID, balance) is sontained in "data.xlsx" file
## About the structure of data
The data of a user have 3 values:
- ID
- balance: amount of money currently be in user's account
## About the API
1. GET: "http://localhost:{port number}/charge?id={ID number}&charge={transaction charge}"
* transaction charge: the amount of money that you want to charge to your account. 
* Response: JSON 
[{
  "success": true/false,
  "balance": your account's balance
}]
2. GET: "http://localhost:{port number}/pay?id={ID number}&cost={transaction cost}"
* transaction cost: the amount of money that you want to withdraw from your account. 
* Response: JSON 
[{
  "success": true/false,
  "balance": your account's balance
}]
3. GET: "http://localhost:{port number}/balance?id={id number}"
* Response: JSON 
[{
  "ID": account's id,
  "balance": your account's balance
}]
 
* Caution: if the access request is denied, It will return JSON with all values is null.
## Intruction
1. Make sure that you have installed these modules: express, xlsx.
2. (Optional) Create a databse by changing the dât in "data.xlsx" file
3. (Optional) You can change "port number" in "paymentserver.js"
4. Run Server by running "paymentserver.js": In termianl, navigate to destination and type "node paymentserver.js"
5. Using API (described above) to get ID os user
