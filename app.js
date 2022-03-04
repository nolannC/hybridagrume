require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const varietyRouter = require('./router/variety');
const cultivarRouter = require('./router/cultivar');

app.use(express.json());
app.use('/varieties', varietyRouter);
app.use('/species', cultivarRouter);

app.listen(PORT, () => {
	console.log(`Server listenning on port ${PORT}`);
});
