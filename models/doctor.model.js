const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
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
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

DoctorSchema.methods.toJSON = function () {

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

}

module.exports = model('Doctor', DoctorSchema);