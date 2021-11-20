const fs = require('fs');
const axios = require('axios');

// janky way of getting the rep address from `config.ts`
const repAddr = fs
    .readFileSync('./config.ts')
    .toString()
    .split('\n')
    .find((line) => line.includes('export const representativeAccount'))
    .split("'")[1];

// get the monkey.svg for the representative account
axios(`https://monkey.banano.cc/api/v1/monkey/${repAddr}`).then((res) => {
    fs.writeFileSync('./public/monkey.svg', res.data);
});

// get the monkey.png for the representative account
axios(`https://monkey.banano.cc/api/v1/monkey/${repAddr}?format=png`, { responseType: 'stream' }).then((res) => {
    res.data.pipe(fs.createWriteStream('./public/monkey.png'));
});
