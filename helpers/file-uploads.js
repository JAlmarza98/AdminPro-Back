const path = require('path');

const { v4: uuidv4 } = require('uuid');

const fileUpload = (files, allowedExtensions = ['jpg', 'png', 'jpeg', 'gif'], directory = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        //Validar la extension
        if (!allowedExtensions.includes(extension)) {
            return reject(`La extension ${extension} no esta permitida, unimamente ${allowedExtensions}`);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', directory, nameTemp);

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nameTemp);

        });

    });

}

module.exports = {
    fileUpload
}