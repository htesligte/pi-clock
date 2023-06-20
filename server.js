const express = require('express');
const util = require('util');
const exec = util.promisify(require('node:child_process').exec);
const asyncHandler = require('express-async-handler')
require('express-async-errors');

const app = express();
const port = 8000;


const shutdown = async () => {
  const {stdout, stderr} = await exec("systemctl poweroff");
  if (stderr) {
    throw new Error(stderr);
  }
  return stdout;
}

const jsonErrorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err });
}

app.post('/shutdown', asyncHandler(async (req, res) => {
  const response = await shutdown();
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify({result: response}));
}));

app.use(express.static('public'));
app.use(jsonErrorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});