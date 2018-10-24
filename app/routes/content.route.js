'use strict';

var multer = require("multer");
var express = require("express");
var router = express.Router();
var contentController = require('./../controllers/content.controller.js');
module.exports = router;

var multerMiddleware = multer({ "dest": "app/content/" });

router.route("/contents")
.get(contentController.list)
.post(multerMiddleware.single("file"),contentController.create)


router.route("/contents/:contentId")
.get(contentController.read)


router.param('contentId', function(req, res, next, id) {
 req.contentId = id;
 next();
});
