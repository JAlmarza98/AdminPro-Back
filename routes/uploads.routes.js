const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidator, fieldsValidator } = require('../middlewares');

const { updateImg, showImg } = require('../controllers/uploads.controller');

const router = Router();

router.get('/:collec/:img', [
    jwtValidator
], showImg);

router.put('/:collec/:term', [
    jwtValidator,
    check('term', 'No es un ID valido').isMongoId(),
    fieldsValidator
], updateImg);

module.exports = router;