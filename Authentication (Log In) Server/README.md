## Introduction
- Authentication (Log In) Server is a simple authentication server
- This server provide API for the third party
- The data (uername, password) is sontained in ```data.xlsx``` file
## About the structure of data
The "login" data of a user have 3 values:
- Username
- Password
- ID
## About the API
GET: ```http://localhost:{port}/login?username={username}&password={password}```
* Response: JSON
```
[{
  "ID": "id",
  "username": "username",
  "password": "password",
}]
```
* Caution: if the access request is denied, It will return JSON with all values is ```null```.
## Intruction
1. Make sure that you have installed these modules: express, mysql, xlsx.
2. (Optional) Create a databse by changing the dât in "data.xlsx" file
3. (Optional) You can change "port number" in "loginserver.js"
4. Run Server by running "loginserver.js": In termianl, navigate to destination and type ```node loginserver.js```
5. Using API (described above) to get ID os user
