const express = require('express');
const router = express.Router();
const multer  = require('multer');
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ response: 'Hi' });
});

router.post('/uploadPhotos', multer().any(), function (req, res, next) {
    console.log(req.files);

    let r = request.post(req.query.server, function(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        res.json(body);
    });

    let f = r.form();

    req.files.forEach(file => {
        f.append(file.fieldname, file.buffer, {
            filename: file.originalname, //required
            contentType: file.mimetype, //required
            // knownLength: file.size
        });
    });
});

module.exports = router;
