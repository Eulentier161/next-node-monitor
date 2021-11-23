require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const repAddr = process.env.representativeAccount;

// get the monkey.svg for the representative account
axios(`https://monkey.banano.cc/api/v1/monkey/${repAddr}`).then((res) => {
    fs.writeFileSync('./public/monkey.svg', res.data);
});

// get the monkey.png for the representative account
axios(`https://monkey.banano.cc/api/v1/monkey/${repAddr}?format=png`, { responseType: 'stream' }).then((res) => {
    res.data.pipe(fs.createWriteStream('./public/monkey.png'));
});
