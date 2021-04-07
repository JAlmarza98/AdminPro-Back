const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const { updateImage } = require('../helpers')

const updateImg = async (req, res) => {

    const { collec, term } = req.params;

    //Validar collecion
    const validCollections = ['users', 'hospitals', 'doctors'];
    if (!validCollections.includes(collec)) {
        res.status(400).json({
            msg: 'La coleccion seleccionada no es correcta'
        });
    }

    //Validar la extension
    const file = req.files.file;
    const cutName = file.name.split('.');
    const extension = cutName[cutName.length - 1];
    const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    if (!validExtensions.includes(extension)) {
        return res.status(400).json({
            msg: `La extension ${extension} no es valida, unicamente archivos ${validExtensions}`
        });
    }

    //Generar nombre del archivo
    const fileName = `${uuidv4()}.${extension}`;

    //Path para guardar la imagen
    const path = `./uploads/${collec}/${fileName}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Error al mover la imagen'
            });
        }

        //Actualizar base de datos
        updateImage(collec, term, fileName);

        res.json({
            ok: true,
            msg: 'Archivo subido con existo',
            fileName
        })
    });


}

const showImg = async (req, res) => {

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