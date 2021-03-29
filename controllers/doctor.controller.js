const { response, request } = require('express');

const { User, Hospital, Doctor } = require('../models');

const doctorGet = async (req = request, res = response) => {

    const { page = 1 } = req.query;

    if (Number(page) < 1) {
        return res.status(400).json({
            message: 'El numero de paginas debe ser 1 minimo'
        })
    }

    const [total_doctors, doctors] = await Promise.all([
        Doctor.countDocuments(),
        Doctor.find()
            .populate('user', 'name img', User)
            .populate('hospital', 'name img', Hospital)
            .skip((Number(page) - 1) * process.env.ITEMS_PER_PAGE)
            .limit(Number(page) * process.env.ITEMS_PER_PAGE)
    ])

    res.json({
        page,
        total_doctors,
        doctors
    })

}

const doctorPost = async (req = request, res = response) => {

    const uid = req.user_auth._id;
    const doctor = new Doctor({ user: uid, ...req.body });

    try {

        const doctorDB = await doctor.save();

        res.json({
            doctor: doctorDB
        })

    } catch (error) {

        console.log(err);

        res.status(500).json({
            msg: 'Hable con el Administrador'
        })

    }


}

const doctorPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { name, hospital } = req.body;

    try {

        const hospitalValid = await Hospital.findById(hospital);

        if (!hospitalValid) {
            return res.status(400).json({
                msg: 'El hospital indicado no existe'
            });
        }

        const doctorChanges = { name, hospital, user_auth };

        const doctorUpdate = await Doctor.findByIdAndUpdate(id, doctorChanges, { new: true });

        res.json({
            doctor: doctorUpdate
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const doctorDelete = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        await Doctor.findByIdAndDelete(id);

        res.json({
            msg: "Medico eliminado de forma satisfactoria"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}
module.exports = {
    doctorGet,
    doctorPost,
    doctorPut,
    doctorDelete
}