

const dbValidators = require('./db-validators');
const generateJWT = require('./jwt-generator');
const googleVerify = require('./google-validator');
const fileUploads = require('./file-uploads');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...fileUploads
}