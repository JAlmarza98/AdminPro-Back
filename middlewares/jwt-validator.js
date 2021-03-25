const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const jwtValidator = async (req = request, res = response, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            message: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

        user_auth = await User.findById(uid);

        if (!user_auth) {
            return res.status(401).json({
                message: "Token no valido"
            });
        }

        if (!user_auth.status) {
            return res.status(401).json({
                message: "Token no valido"
            });
        }

        req.user_auth = user_auth;

        next();
    } catch (error) {
        res.status(401).json({
            message: "token no valido"
        });
    }
}

module.exports = { jwtValidator }