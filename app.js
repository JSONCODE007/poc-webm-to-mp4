const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const downloadFile = require('./download-file');
const convertFile = require('./convert-file');

// create express app
const app = express();

app.use(express.static('uploads'));

// upload file path
const FILE_PATH = 'uploads';

// configure multer
const upload = multer({
  dest: `${FILE_PATH}/`,
  limits: {
    files: 1, // allow up to 5 files per request,
    fieldSize: 5 * 1024 * 1024 // 2 MB (max file size)
  }
});

// enable CORS
app.use(cors());

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(morgan('dev'));

// start the app 
const port = process.env.PORT || 3000;

/**
 *  Example:
 * 
  * POST /convert HTTP/1.1
    Host: localhost:3000
    Content-Type: application/json
    Cache-Control: no-cache
    Postman-Token: fcc8cb7e-0081-374c-bfbd-9f64370e9c68

    {
      "fileUrl": "https://inboldblob.blob.core.windows.net/gstudent/1598490572_RecordedVideo.webm"
    }
 */
app.post('/convert', (req, res, next) => {
  console.log(req.body);
  downloadFile(req.body.fileUrl, (path) => {
    console.log("file path", path);
    convertFile(path, (converted) => {
      console.log('Converted path' + converted);
      const parts = converted.split('/');
      res.send({
        status: true,
        message: 'File is converted.',
        filename: parts[parts.length - 1]
      });
    })
  });
});

// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     downloadFile(null, (path) => {
//       console.log("file path", path);

//       convertFile(path, (converted) => {
//         const avatar = req.file;

//         console.log('Converted path' + converted);

//         // make sure file is available
//         if (!avatar) {
//           res.status(400).send({
//             status: false,
//             data: 'No file is selected.'
//           });
//         } else {
//           // send response
//           res.send({
//             status: true,
//             message: 'File is uploaded.',
//             data: {
//               name: avatar.originalname,
//               mimetype: avatar.mimetype,
//               size: avatar.size
//             }
//           });

//         }
//       })
//     });


//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);