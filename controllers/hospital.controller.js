const { response, request } = require('express');

const Hospital = require('../models');

const hospitalGet = async (req = request, res = response) => {

    res.json({
        msg: 'get de hospitales'
    })

}

const hospitalPost = async (req = request, res = response) => {
    res.json({
        msg: 'post de hospitales'
    })
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