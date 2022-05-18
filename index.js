const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const app = express();

app.use(bodyParser.json());
app.use('/',indexRouter);

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Thermo-Oxy server started listening on port ${port}`);
})

module.exports = app