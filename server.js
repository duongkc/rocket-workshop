const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');

const port = 8080;

const app = new Koa();
app.use(serve(path.resolve('.')));

console.log("Hello, World!!!!");

module.exports = app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});