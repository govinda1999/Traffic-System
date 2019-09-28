const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyparser.json());

app.listen(port, () => console.log(`Hello Listening at ${port}`));
