const path = require('path');
const fs = require('fs');

const { response, request } = require('express');

const { fileUpload } = require('../helpers');

const { User, Hospital, Doctor } = require('../models');

const updateImg = async (req = request, res = response) => {

    const { collec, term } = req.params;

    let model;

    switch (collec) {

        case 'users':
            model = await User.findById(term);

            if (!model) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${term}` })
            }

            break;

        case 'hospitals':
            model = await Hospital.findById(term);

            if (!model) {
                return res.status(400).json({ msg: `No existe un hospital con el id ${term}` })
            }

            break;

        case 'doctors':
            model = await Doctor.findById(term);

            if (!model) {
                return res.status(400).json({ msg: `No existe un doctor con el id ${term}` })
            }

            break;

        default:
            return res.status(500).json({ msg: 'Ruta no disponible' });
    }

    //Limpiar imagenes anteriores
    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collec, model.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const fileName = await fileUpload(req.files, undefined, collec);
    model.img = fileName;

    await model.save();

    res.json(model);
}

const showImg = async (req = request, res = response) => {

    const { collec, img } = req.params;

    const validCollections = ['users', 'hospitals', 'doctors'];

    if (!validCollections.includes(collec)) {
        return res.status(400).json({ msg: 'Ruta no disponible' })
    }

    const pathImg = path.join(__dirname, `../uploads/${collec}/${img}`);
    const noImg = path.join(__dirname, '../assets/no-image.jpg');

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(noImg);
    }

}

module.exports = { updateImg, showImg }