const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/apiGateway-js-sdk', express.static(path.join(__dirname, 'apiGateway-js-sdk')));
app.use('*/apiGateway-js-sdk', express.static(path.join(__dirname, 'apiGateway-js-sdk')));

app.use('*/assets', express.static(path.join(__dirname, 'dist/assets')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});