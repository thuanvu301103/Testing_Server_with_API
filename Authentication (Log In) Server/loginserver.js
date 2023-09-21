const http = require('http');

const host = "localhost";
const port = 8000;

// Create a fucntion use on server
const requestListener = function (req, res) {
	res.writeHead(200);
	res.end("My first server");
};

// Create a server
const server = http.createServer(requestListener);

// Bind server on network
server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
