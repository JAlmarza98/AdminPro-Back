const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, jwtValidator, adminRole, checkRole } = require('../middlewares')

const { validRole, emailExist, userID } = require('../helpers/db-validators')

const { userGet, userPut, userPost, userDelete } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom(emailExist),
    // check('role').custom(validRole),
    fieldsValidator
], userPost);

router.put('/:id', [
    jwtValidator,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    check('name', 'El nombre es obligarotio').not().isEmpty(),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom(emailExist),
    check('role').custom(validRole),
    fieldsValidator
], userPut);

router.delete('/:id', [
    jwtValidator,
    adminRole,
    checkRole('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userID),
    fieldsValidator
], userDelete);



module.exports = router;