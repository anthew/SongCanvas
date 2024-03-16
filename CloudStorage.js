const process = require('process'); // Required to mock environment variables

const {format} = require('util');
const express = require('express');
const router = express.Router();
const Multer = require('multer');

const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50mb file size limit
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket("songcanvas.appspot.com");

// Process the file upload and upload to Google Cloud Storage.
router.post('/cloudStorageTest', multer.single('soundFile'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname); // The name of the file as it was retrieved from uploading
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    res.json({file: publicUrl});
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});
 

module.exports = router;