/*
* https://spin.atomicobject.com/2018/10/08/mock-api-json-server/
* */

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./json/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);
server.listen(port);