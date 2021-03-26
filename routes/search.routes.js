const { Router } = require('express');

const { jwtValidator } = require('../middlewares');

const { searchAll, searchCollection } = require('../controllers/search.controller');

const router = Router();

router.get('/:term', [
    jwtValidator
], searchAll);
router.get('/collection/:collec/:term', [
    jwtValidator
], searchCollection);

module.exports = router;