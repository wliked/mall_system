/**
 * Created by drjr on 17-11-29.
 */
let user = require('./User');

console.log(`userName:${user.userName}`);
console.log(`I am ${user.userName} : ${user.sayHello()}`);


let http = require('http');
let url = require('url');
let util = require('util');

let server = http.createServer((req, res)=>{
    res.statusCode = 200;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    console.log("url"+req.url);

    console.log("parse:" + url.parse(req.url));

    console.log("inspect:" + util.inspect(url.parse(req.url)));

    res.end(util.inspect(url.parse(req.url)));
});

server.listen(3000, '127.0.0.1', ()=>{
    console.log('server already in, please input http://127.0.0.1:3000 in browser to access');
});