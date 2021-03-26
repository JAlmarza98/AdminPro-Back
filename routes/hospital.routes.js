const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole } = require('../middlewares')

const { hospitalExist } = require('../helpers')

const { hospitalGet, hospitalPost, hospitalPut, hospitalDelete } = require('../controllers/hospital.controller');

const router = Router();

router.get('/', hospitalGet);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    fieldsValidator
], hospitalPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(hospitalExist),
    fieldsValidator
], hospitalPut);

router.delete('/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(hospitalExist),
    fieldsValidator
], hospitalDelete);



module.exports = router;