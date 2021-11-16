const fs = require('fs');
const axios = require('axios');

const file = fs.readFileSync('./config.ts');
const fileList = file.toString().split('\n');
let repAddr = undefined;
fileList.forEach((line) => {
    if (line.includes('export const representativeAccount')) {
        repAddr = line.split("'")[1];
    }
});

axios(`https://monkey.banano.cc/api/v1/monkey/${repAddr}`).then((res) => {
    fs.writeFileSync('./public/monkey.svg', res.data);
});
