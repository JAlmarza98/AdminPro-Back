const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole } = require('../middlewares');

const { doctorGet, doctorPost, doctorPut, doctorDelete } = require('../controllers/doctor.controller');

const router = Router();

router.get('/', doctorGet);

router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    fieldsValidator
], doctorPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    fieldsValidator
], doctorPut);

router.delete('/:id', [
    jwtValidator,
    adminRole,
    check('id', 'No es un ID valido').isMongoId(),
    fieldsValidator
], doctorDelete);



module.exports = router;