const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const userGet = async (req = request, res = response) => {

    const { page = 1 } = req.query;

    if (Number(page) < 1) {
        return res.status(400).json({
            message: 'El numero de paginas debe ser 1 minimo'
        })
    }

    const [total_users, users] = await Promise.all([
        User.countDocuments({ status: true }),
        User.find({ status: true })
            .skip((Number(page) - 1) * process.env.ITEMS_PER_PAGE)
            .limit(Number(page) * process.env.ITEMS_PER_PAGE)
    ])

    res.json({
        page,
        total_users,
        users
    });
}

const userPost = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en BBDD
    await user.save();

    res.json(user);
}

const userPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...others } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, others, { new: true });

    res.json(user);
}

const userDelete = async (req = request, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false })

    res.json(user);
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}