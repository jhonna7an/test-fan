const express = require('express');
const path = require('path');
const app = express();

const cryptoJS = require("crypto-js");

app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/signedRequest', (req, res) => {
    try {
        const { data } = req.body;
        const base64Text = Buffer.from(data).toString('base64');
        const privateKey = "3A501F29A7B27BEBD6BC5079AAD479C42C07FDCB04EFFEDE5A89E9DBE50A9725";
        const hash = cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA256(base64Text, privateKey));
        res.status(200).send({ signedRequest: `${hash}.${base64Text}` });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: 'Ocurrió un error al generar el signed_request.'});
    }
});

app.get('*', (req, res) => {
    // console.log('holaaa')
    // res.status(200).send({ text: 'Hola' });
    res.sendFile(path.join(__dirname + '/index.html'));
});


const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log("http://localhost:" + port)
});
