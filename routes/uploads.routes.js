const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidator, fieldsValidator, fileValidator } = require('../middlewares');

const { updateImg, showImg } = require('../controllers/uploads.controller');

const router = Router();

router.get('/:collec/:img', showImg);

router.put('/:collec/:term', [
    jwtValidator,
    fileValidator,
    check('term', 'No es un ID valido').isMongoId(),
    fieldsValidator
], updateImg);

module.exports = router;