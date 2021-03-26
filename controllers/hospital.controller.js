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
    res.json({
        msg: 'put de hospitales'
    })
}

const hospitalDelete = async (req = request, res = response) => {
    res.json({
        msg: 'delete de hospitales'
    })
}

module.exports = {
    hospitalGet,
    hospitalPost,
    hospitalPut,
    hospitalDelete
}