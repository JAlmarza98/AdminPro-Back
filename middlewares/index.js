

const fieldsValidator = require('../middlewares/fields-validator');
const jwtValidator = require('../middlewares/jwt-validator');
const roleValidator = require('../middlewares/role-validator');
const fileValidator = require('../middlewares/file-validator');

module.exports = {
    ...fieldsValidator,
    ...jwtValidator,
    ...roleValidator,
    ...fileValidator
}