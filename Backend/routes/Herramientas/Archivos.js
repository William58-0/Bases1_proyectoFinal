const multer = require('multer');
const fs = require('fs');


// sirve para guardar los archivos enviados desde el frontend
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

function copy(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);

    readStream.on('error', err => reject(err));
    writeStream.on('error', err => reject(err));

    writeStream.on('close', function () {
      resolve();
    });

    readStream.pipe(writeStream);
  })
}

module.exports = {
  upload,
  copy,
};