const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/news', siteController.news);
router.use('/search', siteController.search);
router.use('/', siteController.home);

module.exports = router;
