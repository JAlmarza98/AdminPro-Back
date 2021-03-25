const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre el obligatorio']
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

HospitalSchema.methods.toJSON = function () {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

}

module.exports = model('Hospital', HospitalSchema);