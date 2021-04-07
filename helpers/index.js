

const dbValidators = require('./db-validators');
const generateJWT = require('./jwt-generator');
const googleVerify = require('./google-validator');
const updateImage = require('./update-img')

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...updateImage
}