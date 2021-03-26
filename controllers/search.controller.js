const { response, request } = require('express');

const { User, Hospital, Doctor } = require('../models');

const searchAll = async (req = request, res = response) => {

    const term = req.params.term;
    const regex = new RegExp(term, 'i');

    const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex }),
    ])

    res.json({
        users,
        hospitals,
        doctors
    })

}

const searchCollection = async (req = request, res = response) => {

    const collection = req.params.collec;
    const term = req.params.term;
    const regex = new RegExp(term, 'i');

    let data = [];
    let items;

    switch (collection) {
        case 'users':
            [data, items] = await Promise.all([
                await User.find({ name: regex }),
                await User.countDocuments()
            ]);
            break;

        case 'hospitals':
            [data, items] = await Promise.all([
                await Hospital.find({ name: regex }).populate('user', 'name img', User),
                await Hospital.countDocuments()
            ]);
            break;

        case 'doctors':
            [data, items] = await Promise.all([
                await Doctor.find({ name: regex }).populate('hospital', 'name img', Hospital).populate('user', 'name img', User),
                await Doctor.countDocuments()
            ]);
            break;

        default:
            return res.status(400).json({
                msg: 'La coleccion no existe'
            })
    }

    res.json({ total_items: items, results: data });
}

module.exports = { searchAll, searchCollection }