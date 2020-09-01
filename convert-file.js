
const { exec } = require("child_process");
const { spawn } = require("child_process");

/**
 * Convert any video file to mp4 
 * 
 * ffmpeg (MUST BE INSTALLED ON YOUR SYSTEM)
 * 
 * @param {*} filePath the filePath 
 * @param {*} cb the converted filename will be returned in the callback 
 */
function convertFile(filePath, cb) {
    console.log("Converting file at" + filePath);
    const parts = filePath.split('/');
    const fullName = parts[parts.length - 1].split('.')[0];
    parts[parts.length - 1] = fullName + '.mp4';

    const outputName = parts.join('/');

    console.log('Output name', outputName);

    const command = spawn('ffmpeg', ['-i', filePath, '-qscale', '0', '-y', outputName]);

    command.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    command.on('error', (error) => {
        console.log(`error: ${error.message}`);
        cb(null);
    });

    command.on("close", code => {
        console.log(`child process exited with code ${code}`);
        cb(outputName);
    });

}

module.exports = convertFile;