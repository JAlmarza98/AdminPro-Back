const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole } = require('../middlewares');

const { hospitalExist, doctorExist } = require('../helpers')

const { doctorGet, doctorPost, doctorPut, doctorDelete } = require('../controllers/doctor.controller');

const router = Router();

router.get('/', doctorGet);

router.post('/', [
    jwtValidator,
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('hospital', 'El hospital es obligarotio').not().isEmpty(),
    check('hospital', 'No es un ID valido').isMongoId(),
    check('hospital').custom(hospitalExist),
    fieldsValidator
], doctorPost);

router.put('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(doctorExist),
    fieldsValidator
], doctorPut);

router.delete('/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(doctorExist),
    fieldsValidator
], doctorDelete);



module.exports = router;