const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Came in first middleware", req.url, req.method);
    next();
});

app.use((req, res, next) => {
    console.log("Came in second middleware", req.url, req.method);
    res.send("<h1>Hello from the server!</h1>"); // ✅ Send a response
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}/`);
});
