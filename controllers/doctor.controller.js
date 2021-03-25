const { response, request } = require('express');

const Doctor = require('../models');

const doctorGet = async (req = request, res = response) => {

    res.json({
        msg: 'get de doctores'
    })

}

const doctorPost = async (req = request, res = response) => {
    res.json({
        msg: 'post de doctores'
    })
}

const doctorPut = async (req = request, res = response) => {
    res.json({
        msg: 'put de doctores'
    })
}

const doctorDelete = async (req = request, res = response) => {
    res.json({
        msg: 'delete de doctores'
    })
}

module.exports = {
    doctorGet,
    doctorPost,
    doctorPut,
    doctorDelete
}