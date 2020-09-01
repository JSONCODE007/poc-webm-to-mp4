const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(link, cb) {
    https.get(link, (response) => {
        console.log(link);
        const parts = link.split("/");
        const name = parts[parts.length - 1];
        const file = fs.createWriteStream(path.join('uploads', name));
        response.pipe(file);

        file.on('finish', () => {
            cb(path.join(__dirname, file.path));
        });

         file.on('error', (error) => {
           console.log('Error occured', error);
        });
    });
}

module.exports = downloadFile;