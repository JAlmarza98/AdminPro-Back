const { response, request } = require('express');

const { User, Hospital } = require('../models');


const hospitalGet = async (req = request, res = response) => {

    const { page = 1 } = req.query;

    if (Number(page) < 1) {
        return res.status(400).json({
            message: 'El numero de paginas debe ser 1 minimo'
        })
    }

    const [total_hospitals, hospitals] = await Promise.all([
        Hospital.countDocuments(),
        Hospital.find()
            .populate('user', 'name img', User)
            .skip((Number(page) - 1) * process.env.ITEMS_PER_PAGE)
            .limit(Number(page) * process.env.ITEMS_PER_PAGE)
    ])

    res.json({
        page,
        total_hospitals,
        hospitals
    })

}

const hospitalPost = async (req = request, res = response) => {

    const uid = req.user_auth._id;
    const hospital = new Hospital({ user: uid, ...req.body });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            hospital: hospitalDB
        })

    } catch (err) {

        console.log(err);
        res.status(500).json({
            msg: 'Hable con el Administrador'
        })

    }

}

const hospitalPut = async (req = request, res = response) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        const hospitalChanges = { name, user: user_auth }
        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true })

        res.json({
            hospital: hospitalUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }


}

const hospitalDelete = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        await Hospital.findByIdAndDelete(id);

        res.json({
            msg: "Hospital eliminado de forma satisfactoria"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    hospitalGet,
    hospitalPost,
    hospitalPut,
    hospitalDelete
}