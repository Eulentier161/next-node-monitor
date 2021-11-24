require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const url = `https://monkey.banano.cc/api/v1/monkey/${process.env.NEXT_PUBLIC_representativeAccount}`;

// get the monkey.svg for the representative account
axios(url)
    .then((res) => {
        fs.writeFileSync('./public/monkey.svg', res.data);
    })
    .catch((err) => console.log('couldnt fetch monkey.svg'));

// get the monkey.png for the representative account
axios(url, { params: { format: 'png' }, responseType: 'stream' })
    .then((res) => {
        res.data.pipe(fs.createWriteStream('./public/monkey.png'));
    })
    .catch((err) => console.log('couldnt fetch monkey.png'));
