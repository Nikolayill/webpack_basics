/*
* https://spin.atomicobject.com/2018/10/08/mock-api-json-server/
* */

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./json/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.JSON_SERVER_PORT || 3000;

console.log("Json server started at port", port);

server.use(middlewares);
server.use(router);
server.listen(port);
